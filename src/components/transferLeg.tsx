import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { displayTime } from '../helpers/displayTime';
import { Station } from '../models/station';
import { TravelMode } from '../models/journey';
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

type TransferLegProps = {
  departureTime: Date;
  departureStation: Station;
  mode?: TravelMode;
};

export const TransferLeg: React.FC<TransferLegProps> = (props) => {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.large_text}>
          {displayTime(props.departureTime)}
        </Text>
        <Text style={styles.large_text}>{props.departureStation.name}</Text>
        {/* <View style={styles.spacer} /> */}
      </View>

      <View style={styles.row}>
        {props.mode && (
          <Text
            style={{
              color: 'white',
              backgroundColor: '#00A69B',
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 18,
            }}
          >
            Transfer
          </Text>
        )}
      </View>
    </View>
  );
};
