import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/auth');
      }
    }, [status, router]);

    if (status === 'loading' || !session) {
      return <div>Loading...</div>; // Or a proper loading component
    }

    return <Component {...props} />;
  };
}
