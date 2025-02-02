'use client';
import { Fragment, useRef } from 'react';
import { AppStore, store } from '@/libs/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loading from '@/components/loading/Loading';
interface IProvider {
  children: React.ReactNode;
}

export default function AppProvider({ children }: IProvider) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();

    // if need to initial data, we can dispatch an action in here

    // storeRef.current.dispatch(initializeCount(count))
  }

  return (
    <Fragment>
      <Provider store={storeRef.current}>
        <Loading>{children}</Loading>
        <ToastContainer />
      </Provider>
    </Fragment>
  );
}
