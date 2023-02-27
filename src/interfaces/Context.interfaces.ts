import { ReactNode } from "react";

export interface IContextProvider {
  children: ReactNode;
}

export interface IQueryDatas {
  isFetching: boolean;
  error: unknown;
}
