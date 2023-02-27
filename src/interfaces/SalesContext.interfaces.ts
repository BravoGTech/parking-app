export interface ISalesContext {
  data: any;
  isFetching: boolean;
  error: unknown;
}

export interface ISalesData {
  car_plate: string;
  end_hour: null;
  id: string;
  payment_method: string;
  price: number | null;
  price_by_hour: string;
  sale_date: string;
  start_hour: string;
  user_id: string;
}
