import { ILoginData } from "../pages/Login/LoginForm";

export interface IAuthContext {
  login: (loginData: ILoginData) => Promise<void>;
  token: string | null;
  isFetching: boolean;
  error: any;
}
