import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Status } from '../models/status';
import { TrainOperator } from '../models/trainOperator';
import { displayTime } from '../helpers/displayTime';
import { Journey } from '../models/journeyResponse';
import { statusToDisplayStatus } from '../mappers/status-to-display-status';
import { StatusBox } from './statusBox';

const styles = StyleSheet.create({
  outer_container: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  inner_container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    alignItems: 'flex-end',
    width: '100%',
  },
  large_text: {
    fontSize: 22,
    marginRight: 5,
    marginLeft: 5,
    //alignItems: 'flex-start',
  },
  medium_text: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 5,
    //alignItems: 'flex-start',
  },
  small_text: {
    fontSize: 15,
    marginRight: 5,
    marginLeft: 5,
    //alignItems: 'flex-start',
  },
  spacer: {
    flexGrow: 2,
  },
});

export const JourneyDetails: React.FC<Journey> = (props) => {
  return (
    <View style={styles.outer_container}>
      <View style={styles.inner_container}>
        <Text style={styles.large_text}>
          {displayTime(props.departureTime)}
        </Text>
        <Text style={styles.small_text}>
          arrives {displayTime(props.arrivalTime)}
        </Text>
        <View style={styles.spacer} />
        <Text style={styles.large_text}>
          £
          {(
            Math.min(...props.tickets.map((ticket) => ticket.priceInPennies)) /
            100
          ).toFixed(2)}
        </Text>
      </View>
      <View style={styles.inner_container}>
        <StatusBox
          status={props.status}
          departureRealTime={props.departureRealTime}
        />
        <View style={styles.spacer} />
        <Image
          style={{ width: 80, height: '100%' }}
          resizeMode="contain"
          source={
            require('../../assets/train_operators/AW.png') as ImageSourcePropType
          }
          //require(`../../assets/train_operators/${props.primaryTrainOperator.code}.png`) as ImageSourcePropType
        ></Image>
        {/* <Text style={styles.medium_text}>
          {props.primaryTrainOperator.name}
        </Text> */}
      </View>
    </View>
  );
};
