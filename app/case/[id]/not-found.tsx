import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='text-center'>
      <p className='py-8'>事例が見つかりませんでした。</p>
      <Link href='/'>ホーム画面に戻る</Link>
    </div>
  );
}
