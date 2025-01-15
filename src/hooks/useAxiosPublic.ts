import { axiosPublic as AxiosPublic } from "@/configs/axios";
import { IResponse } from "@/interfaces";
import { IAxiosAPI } from "@/interfaces/resquest.interface";
import { updateStatus } from "@/libs/features/loading/loadingSlice";
import { useAppDispatch } from "@/libs/hooks";

const useAxiosPublic = () => {

  const dispatch = useAppDispatch();

  const axiosPublic = async <T, K>({
    method,
    url,
    data,
  }: IAxiosAPI<T>): Promise<IResponse<K>> => {
    try {
      
      // loading
      dispatch(updateStatus("loading"));

      const response = await AxiosPublic<any, IResponse<K>>({
        method,
        url,
        data,
      });

      return response;

    } catch (error) {

      throw error;

    } finally {
      
      // stop loading
      dispatch(updateStatus("idle"));
    }
  };

  return { axiosPublic };
};

export default useAxiosPublic;