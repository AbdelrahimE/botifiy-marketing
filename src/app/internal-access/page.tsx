'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InternalAccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Set the internal_user cookie
    document.cookie = 'internal_user=true; path=/; max-age=31536000; SameSite=Lax';

    // Redirect to home page
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Activating internal mode...</p>
      </div>
    </div>
  );
}
