import { UseMutateFunction } from "react-query";
import { IUserModalProps } from "./UsersContext.interfaces";

export interface ISalesContext {
  data: any;
  isFetching: boolean;
  error: unknown;
  checkoutSale: UseMutateFunction<ISalesData, any, ICheckoutData, unknown>;
  saleData: ISalesData | undefined;
}

export interface ISalesData {
  carPlate: string;
  carBrand: string;
  checkoutTime: Date | null;
  id: string;
  paymentMethod: string;
  price: number;
  price_by_hour: string;
  sale_date: string;
  checkinTime: string;
  userId: string;
  parkingSlotId: string;
}

export interface ICheckoutData {
  saleId: string;
  paymentMethod?: string;
}

export interface IConfirmSaleModal extends IUserModalProps {
  saleData: ISalesData;
}
