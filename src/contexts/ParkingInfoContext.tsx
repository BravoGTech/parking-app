import { createContext } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IContextProvider } from "../interfaces/Context.interfaces";
import {
  IParkingContextData,
  IUpdatePrice,
} from "../interfaces/ParkingInfoContext.interfaces";
import { api } from "../services/api";

export const ParkingInfoContext = createContext<IParkingContextData>(
  {} as IParkingContextData
);

export const ParkingInfoProvider = ({ children }: IContextProvider) => {
  const { data, isFetching, error, refetch } = useQuery(
    "parkingInfo",
    async () => {
      const response = await api.get("/parking-info/1");
      return response.data;
    }
  );

  const { mutate: updatePrice } = useMutation(
    async ({ value, onClose }: IUpdatePrice) => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const newValue = {
        priceByHour: value,
      };

      return await api.patch(`/parking-info/1/`, newValue).then((response) => {
        onClose();
        return response.data;
      });
    },
    {
      onSuccess: (_) => {
        toast.success("Preço Atualizado");
        refetch();
      },
      onError: () => {
        toast.error("Valor Inválido");
      },
    }
  );
  return (
    <ParkingInfoContext.Provider
      value={{ data, isFetching, error, updatePrice }}
    >
      {children}
    </ParkingInfoContext.Provider>
  );
};
