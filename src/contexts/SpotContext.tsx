import { createContext } from "react";
import { useQuery } from "react-query";
import { IContextProvider } from "../interfaces/Context.interfaces";
import { ISpotContextData } from "../interfaces/SpotContext.interfaces";
import { api } from "../services/api";

export const SpotContext = createContext<ISpotContextData>(
  {} as ISpotContextData
);

export const SpotContextProvider = ({ children }: IContextProvider) => {
  const { data, isFetching, error, refetch } = useQuery("spot", async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/parking-slot");
    return response.data;
  });
  return (
    <SpotContext.Provider value={{ data, isFetching, error }}>
      {children}
    </SpotContext.Provider>
  );
};
