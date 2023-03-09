import { UseMutateFunction } from "react-query";
import { IQueryDatas } from "./Context.interfaces";
import { ISalesData } from "./SalesContext.interfaces";

export interface ISpotContextData extends IQueryDatas {
  data: ISpotDataWithSales[];
  registerSpot: UseMutateFunction<any, unknown, IRegisterSpot, unknown>;
  listSpot: UseMutateFunction<ISpotDataWithSales, unknown, string, unknown>;
  spot: ISpotDataWithSales | undefined;
  updateSpot: UseMutateFunction<ISpotData, unknown, IUpdateForm, unknown>;
  deleteSpot: UseMutateFunction<void, any, IDeleteForm, unknown>;
}

export interface ISpotData {
  id: string | undefined;
  number: number;
  isAvaliable: boolean;
  parkingInfoId: number;
}

export interface ISpotDataWithSales extends ISpotData {
  sales: ISalesData[];
}

export interface IRegisterSpot {
  number: number;
  onClose: () => void;
}

export interface ISpotEditForm {
  number: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IUpdateForm {
  number: number | undefined;
  isAvaliable: boolean | undefined;
  spotId: string | undefined;
}

export interface IDeleteForm {
  spotId: string | undefined;
}
