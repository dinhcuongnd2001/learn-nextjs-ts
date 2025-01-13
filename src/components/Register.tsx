"use client"
import { axiosPublic } from "@/configs/axios";
import { IResponse } from "@/interfaces";
import { useState } from "react";

interface IRegister {
    username: string,
    password: string,
}

const Register = () => {

    const [info, setInfo] = useState<IRegister>({ username: "", password: "" });

    const handleLogin = async ({
      username,
      password,
    }: IRegister): Promise<boolean> => {
      try {
        return true;
      } catch (error) {
        return false;
      }
    };

    const handleUpdateInfo = ({
      field,
      value,
    }: {
      field: "username" | "password";
      value: string;
    }) => {
      setInfo({ ...info, [field]: value });
    };
  
    const handleSubmit = async () => {
      const check = await handleLogin({ ...info });
      if (check) alert("login successfull, you can test token now");
      else alert("Login error");
    };
  
    return (
      <div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={info.username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={(e) =>
              handleUpdateInfo({ field: "username", value: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={info.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) =>
              handleUpdateInfo({ field: "password", value: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    );
}

export default Register;