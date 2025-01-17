'use client';
import { axiosProtected as AxiosProtected } from '@/configs/axios';
import { IResponse } from '@/interfaces';
import { CustomAxiosConfig, IAxiosAPI } from '@/interfaces/resquest.interface';
import { updateStatus } from '@/libs/features/loading/loadingSlice';
import { useAppDispatch } from '@/libs/hooks';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useAxiosProtected = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const axiosProtected = async <T, K>({
    method,
    url,
    data,
  }: IAxiosAPI<T>): Promise<IResponse<K> | IResponse<undefined>> => {
    try {
      // Loading
      dispatch(updateStatus('loading'));

      const response = await AxiosProtected<any, IResponse<K>>({
        method,
        url,
        data,
      });

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.status;
        const sent = (error.config as CustomAxiosConfig).sent;
        if (status == 401 && sent) {
          router.push('/login');
        }
      }
      return Promise.resolve<IResponse<undefined>>({});
    } finally {
      // stop loading
      dispatch(updateStatus('idle'));
    }
  };

  return { axiosProtected };
};

export default useAxiosProtected;
