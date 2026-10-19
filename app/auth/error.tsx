'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-full flex-1 items-center justify-center bg-background p-space-16'>
      <h2>Something went wrong!</h2>
    </div>
  );
}
