"use client"
import {  IUser } from "@/interfaces";
import { useAppDispatch} from "@/libs/hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ValidationError, object, string } from "yup";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Register = () => {

  type FieldType =
    | "username"
    | "password"
    | "firstName"
    | "lastName"
    | "repeatPassword"
    | "dob";

  interface IRegister extends IUser {
    repeatPassword: string
  }

  const [info, setInfo] = useState<IRegister>({
    username: "",
    password: "",
    dob: "",
    firstName: "",
    lastName: "",
    repeatPassword: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { axiosPublic } = useAxiosPublic();

  // schema for validate

  let registerSchema = object({
    repeatPassword: string()
      .required("Repeat password is required")
      .test(
        "re-check password",
        "The repeat password must be equal with password",
        (value) => value === info.password
      ),

    password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "Password must be minimum 8 characters, at least one letter and one number",
    }),

    username: string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters"),

    dob: string().required("Date of birth is required"),
    lastName: string().required("Last name is required"),
    firstName: string().required("First name is required"),
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
      await registerSchema.validate(info);

      // handle register
      const data = await axiosPublic<IRegister, IUser>({
        method: "POST",
        data: { ...info, roles: ["USER"] },
        url: "users",
      });

      router.push("/login");
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
    return;
  };

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
                  field: "firstName",
                  value: e.target.value,
                })
              }
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="form-input peer"
              value={info.firstName}
              placeholder=" "
            />
            <label htmlFor="floating_first_name" className="form-label">
              First name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({ field: "lastName", value: e.target.value })
              }
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="form-input peer"
              placeholder=" "
              value={info.lastName}
            />
            <label htmlFor="floating_last_name" className="form-label">
              Last name
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({ field: "username", value: e.target.value })
              }
              type="text"
              name="floating_email"
              id="floating_email"
              value={info.username}
              className="form-input peer"
              placeholder=" "
            />
            <label htmlFor="floating_email" className="form-label">
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({ field: "dob", value: e.target.value })
              }
              type="date"
              name="floating_dob"
              id="floating_dob"
              className="form-input peer"
              placeholder=" "
              value={info.dob}
            />
            <label htmlFor="floating_dob" className="form-label">
              Dob
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({ field: "password", value: e.target.value })
              }
              type="password"
              value={info.password}
              name="floating_password"
              id="floating_password"
              className="form-input peer"
              placeholder=" "
            />
            <label htmlFor="floating_password" className="form-label">
              Password
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                handleUpdateInfo({
                  field: "repeatPassword",
                  value: e.target.value,
                })
              }
              value={info.repeatPassword}
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="form-input peer"
              placeholder=" "
            />
            <label htmlFor="floating_repeat_password" className="form-label">
              Confirm password
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

export default Register;