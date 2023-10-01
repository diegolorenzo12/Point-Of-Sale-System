import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const userIsLoggedIn = true; 

  if(userIsLoggedIn){
      return <>{children}</>;
  }else{
    router.push('/login');
  }
};

export default ProtectedRoute;
