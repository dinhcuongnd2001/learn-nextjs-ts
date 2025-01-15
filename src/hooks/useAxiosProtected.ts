import { axiosProtected as AxiosProtected } from "@/configs/axios";
import { IResponse } from "@/interfaces";
import { IAxiosAPI } from "@/interfaces/resquest.interface";
import { updateStatus } from "@/libs/features/loading/loadingSlice";
import { useAppDispatch } from "@/libs/hooks";
import { Method } from "axios";

const useAxiosProtected = () => {
  const dispatch = useAppDispatch();

  const axiosProtected = async <T, K>({
    method,
    url,
    data,
  }: IAxiosAPI<T>): Promise<IResponse<K>> => {

    try {
      
      // Loading
      dispatch(updateStatus("loading"));

      const response = await AxiosProtected<any, IResponse<K>>({
        method,
        url,
        data,
      });

      return response;
    
    } catch (error) {
      console.log("error :", error)
      throw error;
    
    } finally {

      // stop loading
      dispatch(updateStatus("idle"));
    }
  };

  return { axiosProtected };
};

export default useAxiosProtected;
