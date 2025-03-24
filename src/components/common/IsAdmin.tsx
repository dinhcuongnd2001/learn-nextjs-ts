'use client';
import { ReactNode, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function isAdmin(Component: () => ReactNode) {
  return function IsAdmin(props: any) {
    const [check, setCheck] = useState<boolean>(true);

    useEffect(() => {
      let temp = false;
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken') || '';
        if (!token) {
          temp = true;
          return redirect('/forbidden');
        }
        const payload = jwtDecode<{ scope: string; sub: string }>(token);
        if (!payload.scope.includes('ROLE_ADMIN')) {
          temp = true;
          return redirect('/forbidden');
        }
        setCheck(temp);
      }
    }, []);

    if (check) return null;

    return <Component {...props} />;
  };
}
