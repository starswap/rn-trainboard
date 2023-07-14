import { Status } from './status';
import { TrainOperator } from './trainOperator';

export type JourneyResponse = {
  outboundJourneys: {
    departureTime: Date;
    arrivalTime: Date;
    departureRealTime: Date;
    status: Status;
    primaryTrainOperator: TrainOperator;
    tickets: { priceInPennies: number }[];
  }[];
};

export enum RequestState {
  Loading,
  InvalidJourney,
  ServerUnavailable,
  NoJourneysReturned,
  NetworkError,
  UnknownError,
}

export type JourneyResponseState = RequestState | JourneyResponse;
