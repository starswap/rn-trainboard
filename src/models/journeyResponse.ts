import { Status } from './status';
import { TrainOperator } from './trainOperator';

export type Journeys = {
  outboundJourneys: Journey[];
};

export type ApiResponseString = {
  outboundJourneys: {
    departureTime: string;
    arrivalTime: string;
    departureRealTime: string;
    status: Status;
    primaryTrainOperator: TrainOperator;
    tickets: { priceInPennies: number }[];
  }[];
};

export type Journey = {
  departureTime: Date;
  arrivalTime: Date;
  departureRealTime: Date;
  status: Status;
  primaryTrainOperator: TrainOperator;
  tickets: { priceInPennies: number }[];
};

export enum RequestState {
  Loading,
  InvalidJourney,
  ServerUnavailable,
  NoJourneysReturned,
  NetworkError,
  UnknownError,
  Success,
}

export type JourneyResponse = {
  requestState: RequestState;
  journeys: Journeys;
};
