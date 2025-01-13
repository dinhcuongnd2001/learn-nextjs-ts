import { IResponse, IToken } from "@/interfaces";
import memoize from "memoize";
import { axiosPublic } from "../axios/axios.public";

// time cache to call fnRefreshToken
const maxAge = parseInt(process.env.NEXT_PUBLIC_MAX_AGE || "10000");

const fnRefreshToken = async () : Promise<IToken> => {
    // step 1 get refresh-token from localhost
    const refreshToken = JSON.parse(
        String(localStorage.getItem("refreshToken"))
      );

    // step 2: use refresh token call to server to get new token pair

    try {
        const {
            result,
          } = await axiosPublic.post<never, IResponse<IToken>>(
            "/auth/refresh-token",
            undefined,
            {
              headers: {
                Authorization: `BEARER ${refreshToken}`,
              },
            }
          );
        
        // if sever reponse will null data remove current token pair in localstorage
        if(!result) 
            throw new Error("Something went wrong");

        // set new token pain to localstorage;
        const {accessToken, refreshToken: newRefreshToken} = result;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(newRefreshToken));
        return { accessToken, refreshToken: newRefreshToken };

    } catch (error) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        return { accessToken: "", refreshToken: "" };
    }
}

export const refreshToken = memoize(fnRefreshToken, {maxAge})