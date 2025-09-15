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
