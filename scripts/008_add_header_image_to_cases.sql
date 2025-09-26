-- 事例テーブルにヘッダー画像フィールドを追加
alter table public.cases 
add column header_image_url text;

-- 既存の事例にデフォルトのヘッダー画像を設定（プレースホルダー画像）
update public.cases 
set header_image_url = '/placeholder.svg?height=200&width=400'
where header_image_url is null;
