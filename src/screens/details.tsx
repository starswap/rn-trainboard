import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import {
  JourneyDetails,
  JourneyDetailsProps,
} from '../components/journeyDetails';
import { config } from '../config';
import {
  JourneyResponse,
  JourneyResponseState,
  RequestState,
} from '../models/journeyResponse';
import { Station } from '../models/station';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 20,
  },
});

const getJourneys = async (
  departureStation: Station,
  arrivalStation: Station,
  date: Date,
): Promise<JourneyResponseState> => {
  const url = `${config.apiBaseUrl}v1/fares?originStation=${
    departureStation.crs
  }&destinationStation=${
    arrivalStation.crs
  }&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=${encodeURIComponent(
    date.toISOString().replace('Z', '+00:00'),
  )}&outboundIsArriveBy=false`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': config.apiKey,
      },
    });
    if (response.status === 400) {
      return RequestState.InvalidJourney;
    } else if (response.status === 503) {
      return RequestState.ServerUnavailable;
    } else if (response.status === 200) {
      const apiResponse = (await response.json()) as JourneyResponse;
      if (apiResponse.outboundJourneys.length === 0) {
        return RequestState.NoJourneysReturned;
      } else {
        return apiResponse;
      }
    } else {
      return RequestState.UnknownError;
    }
  } catch (error) {
    return RequestState.NetworkError;
  }
};

// Returns a time just after the current time, so that the LNER API has a time in the future to consider
const getCurrentDate = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 2); // Default to any time after now
  return date;
};

// Allows us to switch on the result of the Journey Response
const getJourneyDisplay = (journeyResponse: JourneyResponseState) => {
  switch (journeyResponse) {
    case RequestState.Loading:
      return <Text>Loading</Text>;
    case RequestState.InvalidJourney:
      return <Text>Invalid Journey</Text>;
    case RequestState.ServerUnavailable:
      return <Text>Server Unavailable</Text>;
    case RequestState.NoJourneysReturned:
      return <Text>No Journeys Returned</Text>;
    case RequestState.NetworkError:
      return <Text>Network Error</Text>;
    case RequestState.UnknownError:
      return <Text>Unknown Error (HTTP code)</Text>;
    default:
      return (
        <FlatList
          data={[
            { id: 1, title: 'first item' },
            { id: 2, title: 'second item' },
          ]}
          renderItem={({ item }) => {
            return <JourneyDetails></JourneyDetails>;
          }}
        />
      );
  }
}

type DetailsScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const [journeyResponse, setJourneyResponse] =
    React.useState<JourneyResponseState>(RequestState.Loading);
  const [cachedDate, setCachedDate] = React.useState<Date>(getCurrentDate());

  if (getCurrentDate().getMinutes() - cachedDate.getMinutes() > 5) {
    setCachedDate(getCurrentDate());
  }

  useEffect(() => {
    void (async () =>
      setJourneyResponse(
        await getJourneys(
          route.params.departureStation,
          route.params.arrivalStation,
          cachedDate,
        ),
      ))();
  }, [route.params.departureStation, route.params.arrivalStation, cachedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params.departureStation.stationName} to{' '}
        {route.params.arrivalStation.stationName}
      </Text>
      {getJourneyDisplay(journeyResponse)}
    </View>
  );
};

export default DetailsScreen;
