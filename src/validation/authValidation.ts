import { object, string, InferType  } from "yup";


export const registerSchema = object({
  repeatPassword: string()
    .required("Repeat password is required")
    .test(
      "re-check password",
      "The repeat password must be equal with password",
      function (value) {
        console.log("data :", this.parent.password);
        return value === this.parent.password;
      }
    ),

  password: string()
    .required("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "Password must be minimum 8 characters, at least one letter and one number",
    }),

  username: string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters"),

  dob: string().required("Date of birth is required"),
  lastName: string().required("Last name is required"),
  firstName: string().required("First name is required"),
  roles: object().nullable().notRequired()
});



export const loginSchema = registerSchema.pick(['password', "username"]);

export type TLogin = InferType<typeof loginSchema>;
export type TRegister = InferType<typeof registerSchema>;

