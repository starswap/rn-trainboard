import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import StationInput from '../components/stationInput';
import { Station } from '../models/station';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  text: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 20,
  },
  spacer: {
    height: 170,
  },
});

const JourneyScreen: React.FC = () => {
  const defaultStation: Station = { stationName: 'Waterloo', crs: 'WAT' };
  const [departureStation, setDepartureStation] =
    React.useState<Station>(defaultStation);
  const [arrivalStation, setArrivalStation] =
    React.useState<Station>(defaultStation);
  const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${departureStation.crs}&destinationStation=${arrivalStation.crs}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=2022-07-24T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false`;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the journey planner</Text>
        <StationInput
          label="Choose departure station"
          setStation={setDepartureStation}
        />
        <View style={styles.spacer} />
        <StationInput
          label="Choose arrival station"
          setStation={setArrivalStation}
        />
        <View style={styles.spacer} />
        <Button
          mode="contained"
          disabled={!(departureStation.crs && arrivalStation.crs)}
          onPress={() => {
            void (async function () {
              await Linking.openURL(url);
            })();
          }}
        >
          Find routes
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default JourneyScreen;
