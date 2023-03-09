import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IContextProvider } from "../interfaces/Context.interfaces";
import {
  ICheckoutData,
  ISalesContext,
  ISalesData,
} from "../interfaces/SalesContext.interfaces";
import { api } from "../services/api";

export const SalesContext = createContext<ISalesContext>({} as ISalesContext);

export const SalesProvider = ({ children }: IContextProvider) => {
  const [saleData, setSaleData] = useState<ISalesData>();

  const { data, isFetching, error, refetch } = useQuery("sales", async () => {
    const token = localStorage.getItem("@Parking:Token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get("/sales");
      return response.data;
    }
  });

  const { mutate: checkoutSale } = useMutation(
    async ({ saleId, paymentMethod }: ICheckoutData): Promise<ISalesData> => {
      const token = localStorage.getItem("@Parking:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api
        .patch(`/sales/${saleId}/`, { paymentMethod })
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    },
    {
      onSuccess: (response) => {
        setSaleData(response);
        refetch();
      },
      onError: (error: any) => {
        if (error.response.status === 409) {
        }
      },
    }
  );

  return (
    <SalesContext.Provider
      value={{ data, isFetching, error, checkoutSale, saleData }}
    >
      {children}
    </SalesContext.Provider>
  );
};
