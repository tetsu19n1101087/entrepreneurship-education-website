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
