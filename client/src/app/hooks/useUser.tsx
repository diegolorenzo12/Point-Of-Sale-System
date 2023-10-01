import { useContext } from 'react';
import UserContext from "@/app/context/UserContext"

export const useUser = () => {
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData)
  return { userData, setUserData};
};
