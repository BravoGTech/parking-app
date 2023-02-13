import { ILoginData } from "../components/LoginForm";

export interface IAuthContext {
  login: (loginData: ILoginData) => Promise<void>;
  isFetching: boolean;
  error: any;
}
