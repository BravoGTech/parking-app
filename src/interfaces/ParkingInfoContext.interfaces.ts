import { IQueryDatas } from "./Context.interfaces";
import { ISpotData } from "./SpotContext.interfaces";

export interface IParkingContextData extends IQueryDatas {
  data: {
    id: number;
    priceByHour: string;
    parkingSlot: ISpotData[];
  };
}
