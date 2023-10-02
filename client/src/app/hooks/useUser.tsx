import { useContext, useEffect } from 'react';
import UserContext from "@/app/context/UserContext";

export const useUser = () => {
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (userData && typeof userData === 'object') {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return { userData, setUserData };
};
