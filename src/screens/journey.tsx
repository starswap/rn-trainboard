import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import StationInput from '../components/stationInput';
import { Station } from '../models/station';
import { ScreenNavigationProps } from '../routes';

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

type JourneyScreenProps = ScreenNavigationProps<'Journey'>;

const JourneyScreen: React.FC<JourneyScreenProps> = ({ navigation }) => {
  const defaultStation = { stationName: 'Waterloo', crs: 'WAT' };
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
