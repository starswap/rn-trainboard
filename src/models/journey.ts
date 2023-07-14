import { Station } from './station';
import { Status } from './status';
import { TrainOperator } from './trainOperator';

export enum TravelMode {
  SCHEDULED_BUS,
  REPLACEMENT_BUS,
  BUS,
  TRAIN,
  FERRY,
  WALK,
  UNDERGROUND,
  TAXI,
  METRO,
  TRAMLINK,
  PLATFORM_CHANGE,
  CHECK_IN_TIME,
  HOVERCRAFT,
  TRANSFER,
  TRAM,
  DLR,
  LU,
  DLR_LU,
  WALK_TUBE,
  WALK_DLR,
  WALK_TUBE_DLR,
  UNKNOWN,
}

export enum RequestState {
  Loading,
  InvalidJourney,
  ServerUnavailable,
  NoJourneysReturned,
  NetworkError,
  UnknownError,
  Success,
}

export type LegDetails = TripLeg | TransferLeg;

export type TripLeg = {
  type: 'trip';
  mode: TravelMode;
  origin: Station;
  destination: Station;
  departureDateTime: Date;
  arrivalDateTime: Date;
  status: Status;
  trainOperator: TrainOperator;
  departureRealTime: Date;
  arrivalRealTime: Date;
};

export type TransferLeg = {
  type: 'transfer';
  mode: TravelMode;
  origin: Station;
  destination: Station;
  durationInMinutes: number;
};

export type Journey = {
  departureTime: Date;
  arrivalTime: Date;
  departureRealTime: Date;
  status: Status;
  primaryTrainOperator: TrainOperator;
  tickets: { priceInPennies: number }[];
  legs: LegDetails[];
  originStation: Station;
  destinationStation: Station;
};

export type Journeys = {
  outboundJourneys: Journey[];
};

export type JourneyResponse = {
  requestState: RequestState;
  journeys: Journeys;
};
