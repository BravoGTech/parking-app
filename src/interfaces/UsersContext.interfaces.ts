import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { IQueryDatas } from "./Context.interfaces";
import { ISalesData } from "./SalesContext.interfaces";

export interface IUsersContextData extends IQueryDatas {
  data: IUserData[];
  registerUser: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    IRegisterUserProps,
    unknown
  >;
  deleteUser: UseMutateFunction<void, unknown, IDeleteData, unknown>;
  updateUser: UseMutateFunction<any, unknown, IUpdateUserProps, unknown>;
  listUser: UseMutateFunction<IUserDataWithSales, unknown, string, unknown>;
  userData: IUserDataWithSales | undefined;
}

export interface IUserData {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IUserEditModalProps extends IUserModalProps {
  userId: string;
}

export interface IRegisterUserData {
  id?: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUserDataWithSales extends IUserData {
  sales: ISalesData[];
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
  userData: IUserDataWithSales;
  onClose: () => void;
}
