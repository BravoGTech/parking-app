import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { IContextProvider } from "../interfaces/Context.interfaces";
import { ISalesContext } from "../interfaces/SalesContext.interfaces";
import { api } from "../services/api";

export const SalesContext = createContext<ISalesContext>({} as ISalesContext);

export const SalesProvider = ({ children }: IContextProvider) => {
  const { data, isFetching, error } = useQuery("sales", async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/sales");
    return response.data;
  });

  return (
    <SalesContext.Provider value={{ data, isFetching, error }}>
      {children}
    </SalesContext.Provider>
  );
};
