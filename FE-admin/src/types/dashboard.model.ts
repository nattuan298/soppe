export interface DataSale {
  dateTime: string;
  totalPrice: number;
}

export interface DashBoardModel {
  conversionRate: number;
  dataSales: Array<DataSale>;
  numberOrder: number;
  numberUser: number;
  totalSale: number;
  totalTraction: number;
  unit: string;
}

export interface DataTraction {
  date: string;
  traction: number;
}

export interface DataPlatform {
  desktop: number;
  mobile: number;
  unknown?: number;
}
export interface DashBoardPlatFormModel {
  tractionChart: Array<DataTraction>;
  dataPlatform: DataPlatform;
  totalTraction: number;
}
