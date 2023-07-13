import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { displayTime } from '../helpers/displayTime';
import { Journey } from '../models/journeyResponse';
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
          source={{
            uri: `https://hamishstarling.me/train_companies/${props.primaryTrainOperator.code}.png`,
          }}
        ></Image>
      </View>
    </View>
  );
};
