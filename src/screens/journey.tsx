import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import StationInput from '../components/stationInput';
import { Station } from '../models/station';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 20,
  },
  spacer: {
    height: 170,
  },
});

async function getAllStations(): Promise<Station[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}v1/stations`, {
      method: 'GET',
      headers: {
        'x-api-key': config.apiKey,
      },
    });
    if (response.status === 200) {
      return ((await response.json()) as { stations: Station[] }).stations
        .filter((station) => station.crs !== null)
        .sort((stationA, stationB) =>
          stationA.name.localeCompare(stationB.name),
        );
    } else {
      return [];
    }
  } catch {
    return [];
  }
}

type JourneyScreenProps = ScreenNavigationProps<'Journey'>;

const JourneyScreen: React.FC<JourneyScreenProps> = ({ navigation }) => {
  const [allowedStations, setAllowedStations] = React.useState<Station[]>([]);
  React.useEffect(() => {
    void (async () => setAllowedStations(await getAllStations()))();
  }, []);

  const defaultStation = { name: 'Waterloo', crs: 'WAT' };
  const [departureStation, setDepartureStation] =
    React.useState<Station>(defaultStation);
  const [arrivalStation, setArrivalStation] =
    React.useState<Station>(defaultStation);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the journey planner</Text>
        <StationInput
          allowedStations={allowedStations}
          label="Choose departure station"
          setStation={setDepartureStation}
        />
        <View style={styles.spacer} />
        <StationInput
          allowedStations={allowedStations}
          label="Choose arrival station"
          setStation={setArrivalStation}
        />
        <View style={styles.spacer} />
        <Button
          mode="contained"
          disabled={!(departureStation.crs && arrivalStation.crs)}
          onPress={() =>
            navigation.navigate('Details', {
              departureStation: departureStation,
              arrivalStation: arrivalStation,
            })
          }
        >
          Find routes
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default JourneyScreen;
