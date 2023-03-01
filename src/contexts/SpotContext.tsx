import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IContextProvider } from "../interfaces/Context.interfaces";
import {
  IRegisterSpot,
  ISpotContextData,
  ISpotData,
  ISpotDataWithSales,
  IUpdateForm,
} from "../interfaces/SpotContext.interfaces";
import { api } from "../services/api";

export const SpotContext = createContext<ISpotContextData>(
  {} as ISpotContextData
);

export const SpotContextProvider = ({ children }: IContextProvider) => {
  const [spot, setSpot] = useState<ISpotDataWithSales>();

  const { data, isFetching, error, refetch } = useQuery("spot", async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/parking-slot");
    return response.data;
  });

  const { mutate: registerSpot } = useMutation(
    async ({ number, onClose }: IRegisterSpot) => {
      const newSlot = {
        number: number,
        parkingInfoId: 1,
      };
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.post("/parking-slot", newSlot).then((response) => {
        onClose();
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        toast.success("Vaga cadastrado com sucesso");
        setSpot(response);
      },
      onError: () => {
        toast.error("Vaga já registrada");
      },
    }
  );

  const { mutate: listSpot } = useMutation(
    async (number: string): Promise<ISpotDataWithSales> => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.get(`/parking-slot/${number}`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        setSpot(response);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Vaga não encontrada");
      },
    }
  );

  const { mutate: updateSpot } = useMutation(
    async ({
      number,
      spotId,
      isAvaliable,
    }: IUpdateForm): Promise<ISpotData> => {
      const token = localStorage.getItem("@Parking:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const newData = {
        number,
        isAvaliable,
      };

      return await api
        .patch(`/parking-slot/${spotId}/`, newData)
        .then((response) => {
          return response.data;
        });
    },
    {
      onSuccess: (_) => {
        toast.success("Vaga Atualizada");
        refetch();
      },
      onError: (error: any) => {
        if (error.response.status === 409) {
          toast.error("Vaga já existe");
        }
      },
    }
  );

  return (
    <SpotContext.Provider
      value={{
        data,
        isFetching,
        error,
        registerSpot,
        listSpot,
        spot,
        updateSpot,
      }}
    >
      {children}
    </SpotContext.Provider>
  );
};
