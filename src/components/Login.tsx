"use client"
import useAxiosProtected from "@/hooks/useAxiosProtected";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { ILogin, IToken, IUser } from "@/interfaces";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ValidationError, object, string } from "yup";

export default function Login() {
  type FieldType = "username" | "password";


  const [info, setInfo] = useState<ILogin>({
    username: "",
    password: "",
  });

  const { axiosPublic } = useAxiosPublic();
  const { axiosProtected } = useAxiosProtected();
  const router = useRouter();

  // schema for validate
  let loginSchema = object({

    password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "Password must be minimum 8 characters, at least one letter and one number",
    }),

    username: string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters"),
  });

  // handle on change
  const handleUpdateInfo = ({
    field,
    value,
  }: {
    field: FieldType;
    value: string;
  }) => {
    setInfo({ ...info, [field]: value });
  };

  // handle submit
  const handleSubmit = async () => {
    try {
      // validate form
      await loginSchema.validate(info);

      // handle register
      const data = await axiosPublic<ILogin, IToken>({
        method: "POST",
        data: info,
        url: "auth/log-in",
      });

      if(!data.result) return;
      
      const {accessToken, refreshToken} = data.result;

      // set refresh and access token to localstorage;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // test get userId

      const data1 = await axiosProtected<any, IUser>({
        method: "GET",
        url: "users/my-info",
      });

      router.push("/");
    
    } catch (err) {
      let message = "";
      if (err instanceof ValidationError) {
        message = err.errors[0];
      }

      if (err instanceof AxiosError) {
        message = err.response?.data.message || "something went wrong";
      }
      toast.error(message);
    }
  }

  return (
    <div className="py-10">
      <form
        className="max-w-md mx-auto"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({
                  field: "username",
                  value: e.target.value,
                })
              }
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="form-input peer"
              value={info.username}
              placeholder=" "
            />
            <label htmlFor="floating_first_name" className="form-label">
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({ field: "password", value: e.target.value })
              }
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="form-input peer"
              placeholder=" "
              value={info.password}
            />
            <label htmlFor="floating_last_name" className="form-label">
              Password
            </label>
          </div>
        </div>

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}