'use client';
import { IUser } from '@/interfaces';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Input from './common/Input';
import { TRegister, registerSchema } from '@/validation';

const Register = () => {
  type FieldType = 'username' | 'password' | 'firstName' | 'lastName' | 'repeatPassword' | 'dob';

  const [info, setInfo] = useState<TRegister>({
    username: '',
    password: '',
    dob: '',
    firstName: '',
    lastName: '',
    repeatPassword: '',
  });

  const router = useRouter();
  const { axiosPublic } = useAxiosPublic();

  // handle on change
  const handleUpdateInfo = ({ field, value }: { field: FieldType; value: string }) => {
    setInfo({ ...info, [field]: value });
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      // validate form
      await registerSchema.validate(info);

      // handle register
      await axiosPublic<TRegister, IUser>({
        method: 'POST',
        data: { ...info, roles: ['USER'] },
        url: 'users',
      });

      router.push('/login');
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
            value={info.firstName}
            label="First name"
            onChange={val => handleUpdateInfo({ field: 'firstName', value: val })}
          />

          <Input
            value={info.lastName}
            label="Last name"
            onChange={val => handleUpdateInfo({ field: 'lastName', value: val })}
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            value={info.username}
            label="Username"
            onChange={val => handleUpdateInfo({ field: 'username', value: val })}
          />

          <Input
            value={info.dob}
            label="Username"
            onChange={val => handleUpdateInfo({ field: 'dob', value: val })}
            type="date"
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            value={info.password}
            label="Password"
            onChange={val => handleUpdateInfo({ field: 'password', value: val })}
            type="password"
          />

          <Input
            value={info.repeatPassword}
            label="Confirm password"
            onChange={val => handleUpdateInfo({ field: 'repeatPassword', value: val })}
            type="password"
          />
        </div>

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
