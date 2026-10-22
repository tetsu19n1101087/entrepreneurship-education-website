import { getDateParts, toDateTimeAttribute } from '@/lib/format-date';

// 投稿日を「日（大きい数字）」と「年.月」の2段で表示する。値は日本時間で切り出す
export function PostDate({ date }: { date: string }) {
  const { year, month, day } = getDateParts(date);

  return (
    <time
      dateTime={toDateTimeAttribute(date)}
      className='flex w-fit shrink-0 flex-col items-center font-en'
    >
      <span className='sr-only'>{`${year}年${Number(month)}月${Number(day)}日`}</span>
      {/* 日の数字は meta-xl（Inter / 42px / 500）。白抜きに text/default の縁取り */}
      <span
        aria-hidden='true'
        className='text-meta-xl text-card [-webkit-text-stroke:1px_var(--color-foreground)]'
      >
        {day}
      </span>
      <span aria-hidden='true' className='text-meta-sm text-foreground'>
        {`${year}.${month}`}
      </span>
    </time>
  );
}
