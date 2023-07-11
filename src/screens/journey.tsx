import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Text, Button } from 'react-native-paper';
import StationInput from '../components/stationInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 20,
  },
  spacer: {
    flex: 2,
  },
});

const JourneyScreen: React.FC = () => {
  const [departureStation, setDepartureStation] = React.useState('');
  const [arrivalStation, setArrivalStation] = React.useState('');
  const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${departureStation}&destinationStation=${arrivalStation}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=2022-07-24T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false`;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the journey planner</Text>
      <StationInput
        label="Choose departure station"
        station={departureStation}
        setStation={setDepartureStation}
      ></StationInput>
      <StationInput
        label="Choose arrival station"
        station={arrivalStation}
        setStation={setArrivalStation}
      ></StationInput>
      <View style={styles.spacer}></View>
      <Button
        mode="contained"
        onPress={() => {
          void (async function () {
            await Linking.openURL(url);
          })();
        }}
      >
        Find routes
      </Button>
    </View>
  );
};

export default JourneyScreen;
