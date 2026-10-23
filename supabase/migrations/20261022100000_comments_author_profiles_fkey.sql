-- comments.author_id を profiles.id 参照に変更し、PostgREST で comments → profiles を埋め込めるようにする (issue #48)
-- cases_author_id_fkey (20261004000000_init_schema.sql) と同じ方針

-- profiles のない投稿者のコメントがあると外部キーを追加できないので、先に検出して止める
do $$
declare
  orphan_count integer;
begin
  select count(*) into orphan_count
  from public.comments c
  where not exists (select 1 from public.profiles p where p.id = c.author_id);

  if orphan_count > 0 then
    raise exception 'comments に profiles のない author_id が % 件あります。対処してから再実行してください', orphan_count;
  end if;
end;
$$;

alter table public.comments drop constraint if exists comments_author_id_fkey;

alter table public.comments
add constraint comments_author_id_fkey
foreign key (author_id) references public.profiles(id) on delete cascade;

-- PostgREST のスキーマキャッシュを更新（ローカルは pgrst_ddl_watch で自動更新されるが、本番に備えて明示する）
notify pgrst, 'reload schema';
