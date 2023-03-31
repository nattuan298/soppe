export type TripProcessType = {
  currentPointSmall: string;
  initialPointSmall: string;
  firstSeatPointSmall: string;
  secondSeatPointSmall: string;
  remainingNumberSmall: string;
  currentPointBig: string;
  initialPointBig: string;
  firstSeatPointBig: string;
  secondSeatPointBig: string;
  remainingNumberBig: string;
  smallTripName: string;
  bigTripName: string;
};

export type TripProcessBarType = {
  currentPoint: number;
  initialPoint: number;
  firstSeatPoint: number;
  secondSeatPoint: number;
  remainingNumber: number;
  tripName: string;
};

export const GET_TRIP_PROCESS_PV = "GET_TRIP_PROCESS_PV";
