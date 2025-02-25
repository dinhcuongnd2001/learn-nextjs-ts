'use client';
import { ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function isAdmin(Component: () => ReactNode ) {

  return function IsAdmin(props: any) {
    const token = String(localStorage.getItem('accessToken') || "");

    useEffect(() => {
      if (!token) return redirect('/forbidden');
      const payload = jwtDecode<{ scope: string; sub: string }>(token);
      if (!payload.scope.includes('ROLE_ADMIN')) return redirect('/');
    }, []);

    if (!token) return  null;

    return <Component {...props} />;
  };

}
