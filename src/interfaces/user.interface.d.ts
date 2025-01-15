export interface IUser {
    "username": string,
    "password": string,
    "firstName": string,
    "lastName": string,
    "dob": string,
    "roles"?: string[]
}

export interface ILogin extends Pick<IUser, 'username' | "password"> {
}

export interface IRegister extends IUser {
  repeatPassword: string;
};