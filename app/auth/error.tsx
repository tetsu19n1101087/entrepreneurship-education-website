'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4'>
      <h2>Something went wrong!</h2>
    </div>
  );
}
