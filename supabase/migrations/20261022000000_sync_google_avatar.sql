-- Google プロフィール画像を profiles.avatar_url に反映する (issue #29)

-- user_metadata から画像 URL を取り出す。https の URL 以外は null にする
create or replace function public.extract_avatar_url(meta jsonb)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when coalesce(meta ->> 'avatar_url', meta ->> 'picture') like 'https://%'
      then coalesce(meta ->> 'avatar_url', meta ->> 'picture')
    else null
  end;
$$;

revoke execute on function public.extract_avatar_url(jsonb) from public, anon, authenticated;


-- プロファイル自動作成トリガー (avatar_url を追加)
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
    coalesce(new.raw_user_meta_data ->> 'school_name', ''),
    coalesce(new.raw_user_meta_data ->> 'school_type', 'elementary'),
    public.extract_avatar_url(new.raw_user_meta_data)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;


-- user_metadata の更新 (Google ログイン時の最新値) を profiles.avatar_url に追従させる
-- profiles.avatar_url が null か、前回の Google の値のままのときだけ上書きする
create or replace function public.handle_user_metadata_updated()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set
    avatar_url = public.extract_avatar_url(new.raw_user_meta_data),
    updated_at = now()
  where id = new.id
    and (
      avatar_url is null
      or avatar_url = public.extract_avatar_url(old.raw_user_meta_data)
    )
    and avatar_url is distinct from public.extract_avatar_url(new.raw_user_meta_data);

  return new;
end;
$$;

drop trigger if exists on_auth_user_metadata_updated on auth.users;

create trigger on_auth_user_metadata_updated
  after update of raw_user_meta_data on auth.users
  for each row
  when (old.raw_user_meta_data is distinct from new.raw_user_meta_data)
  execute function public.handle_user_metadata_updated();


-- 既存ユーザーの backfill (avatar_url が null の行だけ。何度実行しても結果は変わらない)
update public.profiles p
set avatar_url = public.extract_avatar_url(u.raw_user_meta_data)
from auth.users u
where p.id = u.id
  and p.avatar_url is null
  and public.extract_avatar_url(u.raw_user_meta_data) is not null;
