import React from 'react';
import { Text } from 'react-native';
import { Status } from '../models/status';
import { TrainOperator } from '../models/trainOperator';

export type JourneyDetailsProps = {
  departureTime: Date;
  arrivalTime: Date;
  departureRealTime: Date;
  price: number;
  trainOperator: TrainOperator;
  status: Status;
};

export const JourneyDetails: React.FC = () => {
  return <Text>Journey Details!</Text>;
};
