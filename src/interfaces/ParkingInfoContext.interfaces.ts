import { UseMutateFunction } from "react-query";
import { PriceByHour } from "./../components/DashboardAdmin/PriceByHourPainel/index";
import { IQueryDatas } from "./Context.interfaces";
import { ISpotData } from "./SpotContext.interfaces";

export interface IParkingContextData extends IQueryDatas {
  data: {
    id: number;
    priceByHour: string;
    parkingSlot: ISpotData[];
  };
  updatePrice: UseMutateFunction<any, unknown, IUpdatePrice, unknown>;
}

export interface IUpdatePrice {
  value: number;
  onClose: () => void;
}
