import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function usePublicRouteGuard() {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth?.email) {
      router.replace('/home');
    }
  }, [auth?.email]);
}
