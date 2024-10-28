import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';

export default function page({children }) {
    const { user } = UserAuth(); // Access the user from context
    const router = useRouter();
  return (
    <>
      
    </>
  )
}
