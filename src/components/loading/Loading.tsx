'use client';

import { Fragment } from 'react';
import './loading.css';
import { useAppSelector } from '@/libs/hooks';

export default function Loading({ children }: { children: React.ReactNode }) {
  const selector = useAppSelector(state => state.loading.status);
  return (
    <Fragment>
      {children}
      {selector == 'loading' ? (
        <div className="absolute inset-0 bg-white/60 ">
          <div className="flex justify-center items-center h-full">
            <div className="loading">
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
              <div className="loading__square"></div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
