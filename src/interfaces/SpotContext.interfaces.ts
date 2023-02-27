import { IQueryDatas } from "./Context.interfaces";

export interface ISpotContextData extends IQueryDatas {
  data: ISpotData[];
}

export interface ISpotData {
  id: string;
  number: number;
  isAvaliable: boolean;
  parkingInfoId: number;
}
