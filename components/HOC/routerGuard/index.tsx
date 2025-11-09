'use client';
 /* eslint-disable react-hooks/exhaustive-deps */
 import { useEffect, useState } from 'react';
 import { usePathname, useRouter } from 'next/navigation';
 import { PUBLIC_PATH, ROUTES_PATH } from '@/utils/constant';
 
 export const RouterGuard = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const pathname = usePathname();
 
   const [authorized, setAuthorized] = useState<boolean>(false);

   let currentUser:any = null;
    if (typeof window !== "undefined") {
      currentUser = localStorage.getItem("currentUser");
    }
 
   useEffect(() => {
       authCheck(pathname);
   }, [
     currentUser,
     pathname,
   ]);
 
   function authCheck(url: string) {
     const isPublicPath = Object.values(PUBLIC_PATH).includes(url);
 
     if (!currentUser && !isPublicPath) {
       router.push(ROUTES_PATH.LOGIN);
       return false;
     }
 
     if (currentUser && (isPublicPath || url === '/')) {
       router.push(ROUTES_PATH.HOME);
       return false;
     }
 
     setAuthorized(true);
   }
 
   return authorized ? children : <></>;
 };