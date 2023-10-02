"use client"
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  useEffect(() => {
    if (userData === undefined || userData === null || userData.isLoggedIn === undefined || !userData.isLoggedIn) {
      router.push('/login');
    }
  }, [userData, router]);
  
  return <>{children}</>;
};

export default ProtectedRoute;