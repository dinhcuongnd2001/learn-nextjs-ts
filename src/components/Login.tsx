'use client';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { IToken } from '@/interfaces';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import Input from './common/Input';
import { TLogin, loginSchema } from '@/validation';

export default function Login() {
  type FieldType = 'username' | 'password';

  const [info, setInfo] = useState<TLogin>({
    username: '',
    password: '',
  });

  const { axiosPublic } = useAxiosPublic();
  const router = useRouter();

  // handle on change
  const handleUpdateInfo = ({ field, value }: { field: FieldType; value: string }) => {
    setInfo({ ...info, [field]: value });
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      // validate form
      await loginSchema.validate(info);

      // handle register
      const data = await axiosPublic<TLogin, IToken>({
        method: 'POST',
        data: info,
        url: 'auth/log-in',
      });

      if (!data.result) return;

      const { accessToken, refreshToken } = data.result;

      // set refresh and access token to localstorage;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      router.push('/');
    } catch (err) {
      let message = '';
      if (err instanceof ValidationError) {
        message = err.errors[0];
      }

      if (err instanceof AxiosError) {
        message = err.response?.data.message || 'something went wrong';
      }
      toast.error(message);
    }
  };

  return (
    <div className="py-10">
      <form
        className="max-w-md mx-auto"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            value={info.username}
            label="Username"
            onChange={val => handleUpdateInfo({ field: 'username', value: val })}
          />

          <Input
            value={info.password}
            label="Password"
            onChange={val => handleUpdateInfo({ field: 'password', value: val })}
            type="password"
          />
        </div>

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
