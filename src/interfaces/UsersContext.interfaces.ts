import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

export interface IUsersContextData {
  data: any;
  isFetching: boolean;
  error: unknown;
  registerUser: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    IRegisterUserProps,
    unknown
  >;
  deleteUser: UseMutateFunction<void, unknown, IDeleteData, unknown>;
  updateUser: UseMutateFunction<any, unknown, IUpdateUserProps, unknown>;
}

export interface IUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IRegisterUserData {
  id?: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IRegisterUserProps {
  data: IRegisterUserData;
  onClose: () => void;
}

export interface IDeleteData {
  userId: string;
  onClose: () => void;
}

export interface IDeleteUserProps extends IDeleteData {
  isOpen: boolean;
}

export interface IUpdateUserData {
  id?: string;
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface IUpdateUserProps {
  data: IUpdateUserData;
  onClose: () => void;
  userId: string;
}

export interface IUpdateFormProps {
  userId: string;
}
