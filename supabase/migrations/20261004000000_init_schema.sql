-- プロファイルテーブルの作成
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  school_name text not null,
  school_type text not null check (school_type in ('elementary', 'junior_high', 'high_school')),
  subject text,
  years_experience integer,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSを有効化
alter table public.profiles enable row level security;

-- プロファイル用のポリシー
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);


-- 事例テーブルの作成
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  school_type text not null check (school_type in ('elementary', 'junior_high', 'high_school')),
  subject text not null,
  grade_level text,
  duration text,
  materials text,
  tags text[] default '{}',
  author_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSを有効化
alter table public.cases enable row level security;

-- 事例用のポリシー
create policy "cases_select_all"
  on public.cases for select
  using (true);

create policy "cases_insert_own"
  on public.cases for insert
  with check (auth.uid() = author_id);

create policy "cases_update_own"
  on public.cases for update
  using (auth.uid() = author_id);

create policy "cases_delete_own"
  on public.cases for delete
  using (auth.uid() = author_id);


-- コメントテーブルの作成
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  case_id uuid not null references public.cases(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSを有効化
alter table public.comments enable row level security;

-- コメント用のポリシー
create policy "comments_select_all"
  on public.comments for select
  using (true);

create policy "comments_insert_authenticated"
  on public.comments for insert
  with check (auth.uid() = author_id);

create policy "comments_update_own"
  on public.comments for update
  using (auth.uid() = author_id);

create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = author_id);


-- いいねテーブルの作成
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id uuid references public.cases(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint likes_target_check check (
    (case_id is not null and comment_id is null) or
    (case_id is null and comment_id is not null)
  ),
  unique(user_id, case_id),
  unique(user_id, comment_id)
);

-- RLSを有効化
alter table public.likes enable row level security;

-- いいね用のポリシー
create policy "likes_select_all"
  on public.likes for select
  using (true);

create policy "likes_insert_own"
  on public.likes for insert
  with check (auth.uid() = user_id);

create policy "likes_delete_own"
  on public.likes for delete
  using (auth.uid() = user_id);


-- フォローテーブルの作成
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(follower_id, following_id),
  constraint follows_no_self_follow check (follower_id != following_id)
);

-- RLSを有効化
alter table public.follows enable row level security;

-- フォロー用のポリシー
create policy "follows_select_all"
  on public.follows for select
  using (true);

create policy "follows_insert_own"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "follows_delete_own"
  on public.follows for delete
  using (auth.uid() = follower_id);


-- プロファイル自動作成トリガー
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, school_name, school_type)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'New Teacher'),
    coalesce(new.raw_user_meta_data ->> 'school_name', ''),
    coalesce(new.raw_user_meta_data ->> 'school_type', 'elementary')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();


-- casesテーブルの外部キー制約を修正
-- author_idをprofiles.idを参照するように変更

-- 既存の外部キー制約を削除
alter table public.cases drop constraint if exists cases_author_id_fkey;

-- author_idをprofiles.idを参照するように新しい外部キー制約を追加
alter table public.cases 
add constraint cases_author_id_fkey 
foreign key (author_id) references public.profiles(id) on delete cascade;


-- 事例テーブルにヘッダー画像フィールドを追加
alter table public.cases 
add column header_image_url text;

-- 既存の事例にデフォルトのヘッダー画像を設定（プレースホルダー画像）
update public.cases 
set header_image_url = '/placeholder.svg?height=200&width=400'
where header_image_url is null;
