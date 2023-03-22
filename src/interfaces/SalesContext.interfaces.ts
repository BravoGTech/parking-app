import { ISpotData } from "./SpotContext.interfaces";
import { UseMutateFunction } from "react-query";

export interface ISalesContext {
  data: any;
  isFetching: boolean;
  error: unknown;
  checkoutSale: UseMutateFunction<ISalesData, any, ICheckoutData, unknown>;
  saleData: ISalesData | undefined;
  checkinSale: UseMutateFunction<ISalesData, any, ICheckinMutation, unknown>;
  listSale: UseMutateFunction<ISalesData, any, ISaleProfileMutation, unknown>;
  saleProfileData: ISalesData | undefined;
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
  parkingSlot: ISpotData;
}

export interface ISalesReportData extends ISalesData {
  parkingTime: number;
}

export interface ICheckinData {
  carPlate: string;
  carBrand: string;
  spotNumber: number;
}

export interface ICheckinMutation {
  data: ICheckinData;
}

export interface ISaleProfileMutation {
  saleId: string;
}

export interface ICheckoutData {
  saleId: string;
  paymentMethod?: string;
}
