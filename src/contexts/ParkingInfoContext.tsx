import { createContext } from "react";
import { useQuery } from "react-query";
import { IContextProvider } from "../interfaces/Context.interfaces";
import { IParkingContextData } from "../interfaces/ParkingInfoContext.interfaces";
import { api } from "../services/api";

export const ParkingInfoContext = createContext<IParkingContextData>(
  {} as IParkingContextData
);

export const ParkingInfoProvider = ({ children }: IContextProvider) => {
  const { data, isFetching, error, refetch } = useQuery("parkingInfo", async () => {
    const response = await api.get("/parking-info/1");
    return response.data;
  });
  return (
    <ParkingInfoContext.Provider value={{ data, isFetching, error }}>
      {children}
    </ParkingInfoContext.Provider>
  );
};
