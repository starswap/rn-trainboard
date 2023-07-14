import { Status } from './status';
import { TrainOperator } from './trainOperator';

export type ApiLegDetails = ApiTripLeg | ApiTransferLeg;

export type ApiStation = {
  displayName: string;
  crs: string;
};

export type ApiTripLeg = {
  type: 'trip';
  mode: string;
  origin: ApiStation;
  destination: ApiStation;
  departureDateTime: string;
  arrivalDateTime: string;
  status: Status;
  trainOperator: TrainOperator;
  departureRealTime: string;
  arrivalRealTime: string;
};

export type ApiTransferLeg = {
  type: 'transfer';
  mode: string;
  origin: ApiStation;
  destination: ApiStation;
  durationInMinutes: number;
};

export type ApiResponseString = {
  outboundJourneys: {
    departureTime: string;
    arrivalTime: string;
    departureRealTime: string;
    status: Status;
    primaryTrainOperator: TrainOperator;
    legs: ApiLegDetails[];
    originStation: ApiStation;
    destinationStation: ApiStation;
    tickets: { priceInPennies: number }[];
  }[];
};
