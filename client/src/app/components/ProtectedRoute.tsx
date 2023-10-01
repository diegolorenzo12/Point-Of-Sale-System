import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const {userData, setUserData} = useUser();
  console.log(userData)
  if(userData === undefined ||userData === null || userData.isLoggedIn === undefined  || !userData.isLoggedIn){
    router.push('/login');
  }else{
    return <>{children}</>;
  }
};

export default ProtectedRoute;
