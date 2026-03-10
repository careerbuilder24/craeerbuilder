// import { UserAuth } from '@/app/context/AuthContext';
import { UserAuth } from '@/app/context/AuthContext';
import useRegistered from './useRegistered';


export default function useMatchedUserByEmail() {
  const [register] = useRegistered();
  const { ManualUser } = UserAuth();

  // Find the first registered user that matches the manual user's email
  const matchedUsers = register?.data?.find(
    (user) => user.email === ManualUser?.email
  );

 

  return {
    matchedUsers,
   
  };
}
