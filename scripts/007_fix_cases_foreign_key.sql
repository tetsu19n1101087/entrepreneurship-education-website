-- casesテーブルの外部キー制約を修正
-- author_idをprofiles.idを参照するように変更

-- 既存の外部キー制約を削除
alter table public.cases drop constraint if exists cases_author_id_fkey;

-- author_idをprofiles.idを参照するように新しい外部キー制約を追加
alter table public.cases 
add constraint cases_author_id_fkey 
foreign key (author_id) references public.profiles(id) on delete cascade;
