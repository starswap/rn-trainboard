import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { JourneyDetails } from '../components/journeyDetails';
import { config } from '../config';
import {
  Journeys,
  JourneyResponse,
  ApiResponseString,
  RequestState,
} from '../models/journeyResponse';
import { Station } from '../models/station';
import { jsonToJourneyDetail } from '../mappers/json-to-journeyDetails';

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
    fontSize: 25,
  },
});

const getJourneys = async (
  departureStation: Station,
  arrivalStation: Station,
  date: Date,
): Promise<JourneyResponse> => {
  const url = `${config.apiBaseUrl}v1/fares?originStation=${
    departureStation.crs
  }&destinationStation=${
    arrivalStation.crs
  }&noChanges=false&numberOfAdults=1&numberOfChildren=0&journeyType=single&outboundDateTime=${encodeURIComponent(
    date.toISOString().replace('Z', '+00:00'), //default to 1 adult for now
  )}&outboundIsArriveBy=false`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': config.apiKey,
      },
    });
    if (response.status === 400) {
      return {
        requestState: RequestState.InvalidJourney,
        journeys: { outboundJourneys: [] },
      };
    } else if (response.status === 503) {
      return {
        requestState: RequestState.ServerUnavailable,
        journeys: { outboundJourneys: [] },
      };
    } else if (response.status === 200) {
      const apiResponseString = (await response.json()) as ApiResponseString;
      const apiResponse: Journeys = jsonToJourneyDetail(apiResponseString);
      if (apiResponse.outboundJourneys.length === 0) {
        return {
          requestState: RequestState.NoJourneysReturned,
          journeys: { outboundJourneys: [] },
        };
      } else {
        return { requestState: RequestState.Success, journeys: apiResponse };
      }
    } else {
      return {
        requestState: RequestState.UnknownError,
        journeys: { outboundJourneys: [] },
      };
    }
  } catch (error) {
    return {
      requestState: RequestState.NetworkError,
      journeys: { outboundJourneys: [] },
    };
  }
};

// The LNER API needs a time in the future
const getTwoMinutesFromNow = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 2); // Default to any time after now
  return date;
};

const getJourneyDisplay = (journeyResponse: JourneyResponse) => {
  switch (journeyResponse.requestState) {
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
    case RequestState.Success:
      return (
        <FlatList
          style={{ width: '90%' }}
          data={journeyResponse.journeys.outboundJourneys}
          renderItem={({ item }) => {
            return <JourneyDetails {...item}></JourneyDetails>;
          }}
        />
      );
  }
};

type DetailsScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const departureStation = route.params.departureStation;
  const arrivalStation = route.params.arrivalStation;
  const [journeyResponse, setJourneyResponse] = React.useState<JourneyResponse>(
    { requestState: RequestState.Loading, journeys: { outboundJourneys: [] } },
  );
  const [cachedDate, setCachedDate] = React.useState<Date>(
    getTwoMinutesFromNow(),
  );

  if (getTwoMinutesFromNow().getMinutes() - cachedDate.getMinutes() > 5) {
    setCachedDate(getTwoMinutesFromNow());
  }

  useEffect(() => {
    void (async () =>
      setJourneyResponse(
        await getJourneys(departureStation, arrivalStation, cachedDate),
      ))();
  }, [departureStation, arrivalStation, cachedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {departureStation.name} to {arrivalStation.name}
      </Text>
      {getJourneyDisplay(journeyResponse)}
    </View>
  );
};

export default DetailsScreen;
