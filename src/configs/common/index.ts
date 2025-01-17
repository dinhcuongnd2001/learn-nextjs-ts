import { IResponse, IToken } from '@/interfaces';
import memoize from 'memoize';
import { axiosPublic } from '../axios/axios.public';

// time cache to call fnRefreshToken
const maxAge = parseInt(process.env.NEXT_PUBLIC_MAX_AGE || '10000');

const fnRefreshToken = async (): Promise<IToken> => {
  // step 1 get refresh-token from localhost
  const refreshToken = String(localStorage.getItem('refreshToken'));
  const token = String(localStorage.getItem('accessToken'));

  // step 2: use refresh token call to server to get new token pair

  try {
    const { result } = await axiosPublic.post<never, IResponse<IToken>>('/auth/refresh-token', {
      token,
      refreshToken,
    });

    // if sever reponse will null data remove current token pair in localstorage
    if (!result) throw new Error('Something went wrong');

    // set new token pain to localstorage;
    const { accessToken, refreshToken: newRefreshToken } = result;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.log('🚀 ~ fnRefreshToken ~ error:', error);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return { accessToken: '', refreshToken: '' };
  }
};

export const refreshToken = memoize(fnRefreshToken, { maxAge });
