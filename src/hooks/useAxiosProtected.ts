'use client';
import { axiosProtected as AxiosProtected } from '@/configs/axios';
import { IResponse, IResponseError } from '@/interfaces';
import { CustomAxiosConfig, IAxiosAPI } from '@/interfaces/resquest.interface';
import { updateStatus } from '@/libs/features/loading/loadingSlice';
import { useAppDispatch } from '@/libs/hooks';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useAxiosProtected = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const axiosProtected = async <T, K>({
    method = 'GET',
    url,
    data,
    params,
    loading = true,
    message,
  }: IAxiosAPI<T>): Promise<IResponse<K> | IResponse<undefined>> => {
    try {
      // Loading
      if (loading) dispatch(updateStatus('loading'));

      if (params) {
        url += '?';
        for (const key in params) {
          url += key + '=' + params[key] + '&';
        }
        // remove last character "&" in str
        url = url.substring(0, url.length - 1);
      }

      const response = await AxiosProtected<any, IResponse<K>>({
        method,
        url,
        data,
      });

      if (message) toast.success(message);

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.status;
        const sent = (error.config as CustomAxiosConfig).sent;
        if (status == 401 && sent) {
          router.push('/login');
        }
        toast.error((error as IResponseError).message);
      }
      return Promise.resolve<IResponse<undefined>>({});
    } finally {
      // stop loading
      if (loading) dispatch(updateStatus('idle'));
    }
  };

  return { axiosProtected };
};

export default useAxiosProtected;
