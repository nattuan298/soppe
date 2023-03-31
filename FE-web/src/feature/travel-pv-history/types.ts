export interface TravelPVHistoryType {
  fromDate: string;
  toDate: string;
  tripId: string;
  tripName: string;
  specialPoint: string;
  mb2su: string;
  mb2ex: string;
  privPv: string;
  leftPv: string;
  rightPv: string;
  balancePv: string;
  totalTripPv: number;
  locationbase: string;
  tripPv: string;
}

export interface TripType {
  rCode: string;
  name: string;
  fromDate: string;
  toDate: string;
  firstSeat: string;
  secondSeat: string;
}
type payloadProps = {
  paramsURL: string;
};
export const GET_TRIP_TRAVEL = "GET_TRIP_TRAVEL";
export const GET_TRIP_TRAVEL_HISTORY = "GET_TRIP_TRAVEL_HISTORY";

export type getTripTravelHistoryProps = {
  type: typeof GET_TRIP_TRAVEL_HISTORY;
  payload: payloadProps;
};
