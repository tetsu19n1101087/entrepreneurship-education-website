// 投稿日を「日（大きい数字）」と「年.月」の2段で表示する。値は日本時間で切り出す
const formatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function PostDate({ date }: { date: string }) {
  const parts = formatter.formatToParts(new Date(date));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  const year = part('year');
  const month = part('month');
  const day = part('day');

  return (
    <time
      dateTime={`${year}-${month}-${day}`}
      className='flex shrink-0 flex-col items-center font-en'
    >
      <span className='sr-only'>{`${year}年${Number(month)}月${Number(day)}日`}</span>
      {/* 42px の数字はトークンにない、この部品だけの表示。白抜きに text/default の縁取り */}
      <span
        aria-hidden='true'
        className='text-[42px] leading-[42px] text-card [-webkit-text-stroke:1px_var(--color-foreground)]'
      >
        {day}
      </span>
      <span aria-hidden='true' className='text-meta-sm text-foreground'>
        {`${year}.${month}`}
      </span>
    </time>
  );
}
