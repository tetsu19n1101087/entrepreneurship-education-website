-- 本番 DB で手作業で変更されていたスキーマに、マイグレーションを合わせる (issue #66)
-- 本番ではすでにこの状態なので、本番に対しては実質的に何も変わらない

-- 学校種別に「その他 (others)」を許可する（アプリの型 lib/definitions.ts と同じ）
alter table public.profiles drop constraint if exists profiles_school_type_check;

alter table public.profiles
add constraint profiles_school_type_check
check (school_type = any (array['elementary', 'junior_high', 'high_school', 'others']));

alter table public.cases drop constraint if exists cases_school_type_check;

alter table public.cases
add constraint cases_school_type_check
check (school_type = any (array['elementary', 'junior_high', 'high_school', 'others']));

-- 学校名は未入力 (null) を許可する
alter table public.profiles alter column school_name drop not null;

-- 新規登録時のプロファイル作成を本番の挙動に合わせる
-- 20261022000000_sync_google_avatar.sql の版は school_name を ''、school_type を 'elementary' にしてしまうため、
-- 本番と同じく学校名は null のまま、学校種別の既定は 'others' にする（avatar_url の同期はそのまま）
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, school_name, school_type, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'New Teacher'),
    new.raw_user_meta_data ->> 'school_name',
    coalesce(new.raw_user_meta_data ->> 'school_type', 'others'),
    public.extract_avatar_url(new.raw_user_meta_data)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- 本番で手作業で追加されていた comments → profiles の外部キー
-- 20261022100000_comments_author_profiles_fkey.sql の comments_author_id_fkey と重複するので削除する
alter table public.comments drop constraint if exists comments_author_id_fkey1;
