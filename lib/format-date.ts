// 日付は日本時間で切り出す。サーバー(UTC)とブラウザのどちらで描画しても同じ結果になる
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  numberingSystem: 'latn',
});

export type DateParts = { year: string; month: string; day: string };

// 月・日は0埋め済み
export function getDateParts(value: string | Date): DateParts {
  const parts = formatter.formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return { year: part('year'), month: part('month'), day: part('day') };
}

// 表示用。2026.10.15
export function formatDate(value: string | Date): string {
  const { year, month, day } = getDateParts(value);
  return `${year}.${month}.${day}`;
}

// <time dateTime> 用。2026-10-15
export function toDateTimeAttribute(value: string | Date): string {
  const { year, month, day } = getDateParts(value);
  return `${year}-${month}-${day}`;
}
