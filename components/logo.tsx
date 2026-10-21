import Image from 'next/image';

// Figma の「Logo」。シンボルとサイト名をアウトライン化した SVG で、暗い背景には white を使う
export function Logo({ surface = 'light' }: { surface?: 'light' | 'dark' }) {
  return (
    <Image
      src={surface === 'dark' ? '/logo-white.svg' : '/logo.svg'}
      alt='entredu'
      width={146}
      height={40}
      // ヘッダーのロゴはファーストビューに入る。フッター（dark）は遅延読み込みでよい
      loading={surface === 'dark' ? 'lazy' : 'eager'}
    />
  );
}
