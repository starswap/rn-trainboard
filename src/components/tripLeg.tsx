import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { displayTime } from '../helpers/displayTime';
import { Journey, LegDetails, TravelMode } from '../models/journey';
import { StatusBox } from './statusBox';
import { config } from '../config';
import { Station } from '../models/station';
import { TrainOperator } from '../models/trainOperator';
import { Status } from '../models/status';

const styles = StyleSheet.create({
  outer_container: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  inner_container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    // alignItems: 'cent/',
    width: '100%',
  },
  large_text: {
    fontSize: 22,
    marginRight: 5,
    marginLeft: 5,
  },
  medium_text: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 5,
  },
  small_text: {
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
  },
  spacer: {
    flexGrow: 2,
  },
});

type TripLegProps = {
  departureTime: Date;
  departureRealTime: Date;
  arrivalTime: Date; // maybe
  departureStation: Station;
  trainOperator: TrainOperator;
  status: Status;
  mode: TravelMode;
};

export const TripLeg: React.FC<TripLegProps> = (props) => {
  return (
    <View style={styles.outer_container}>
      <View style={styles.inner_container}>
        <Text style={styles.large_text}>
          {displayTime(props.departureTime)}
        </Text>
        <Text style={styles.large_text}>{props.departureStation.name}</Text>

      </View>
      <View style={styles.inner_container}>
        <StatusBox
          status={props.status}
          departureRealTime={props.departureRealTime}
        />
        <View style={styles.spacer}></View>
        <Image
          style={{ width: 80, height: '100%' }}
          resizeMode="contain"
          source={{
            uri: `${config.assetUrl}${props.trainOperator.code}.png`,
          }}
        ></Image>
      </View>
    </View>
  );
};
