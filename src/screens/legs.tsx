import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { ScreenNavigationProps } from '../routes';
import { ProgressDots } from '../components/progressDots';
import { TransferLeg } from '../components/transferLeg';
import { TripLeg } from '../components/tripLeg';
import { millisecondsToMinutes } from '../helpers/millisecondsToMinutes';
import { TravelMode } from '../models/journey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 25,
  },
});

const TOTAL_DOTS = 10;

type LegsScreenProps = ScreenNavigationProps<'Legs'>;

const LegsScreen: React.FC<LegsScreenProps> = ({ route }) => {
  const journey = route.params.journey;
  const departureTimes: Date[] = [];
  // console.log(journey.arrivalTime);
  // console.log(journey.destinationStation);
  console.log(journey);
  let currentTime = new Date(journey.departureTime.toISOString());
  for (const leg of journey.legs) {
    departureTimes.push(new Date(currentTime.toISOString()));
    switch (leg.type) {
      case 'trip': {
        currentTime = new Date(leg.arrivalDateTime.toISOString());
        break;
      }
      case 'transfer': {
        currentTime.setMinutes(
          currentTime.getMinutes() + leg.durationInMinutes,
        );
        break;
      }
    }
  }
  console.log(departureTimes)

  const computeDots = (durationInMinutes: number) => {
    return Math.ceil(
      (TOTAL_DOTS * durationInMinutes) /
        millisecondsToMinutes(
          journey.arrivalTime.valueOf() - journey.departureTime.valueOf(),
        ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {journey.originStation.name} to {journey.destinationStation.name}
      </Text>

      <FlatList
        scrollEnabled={false}
        style={{ width: '100%', flexGrow: 0}}
        data={journey.legs}
        renderItem={({ item, index }) => {
          switch (item.type) {
            case 'transfer': {
              const departureStation =
                index == 0
                  ? journey.originStation
                  : journey.legs[index - 1].destination;
              return (
                <>
                  <TransferLeg
                    mode={item.mode}
                    departureStation={departureStation}
                    departureTime={departureTimes[index]}
                  ></TransferLeg>
                  <ProgressDots
                    numOfDots={computeDots(item.durationInMinutes)}
                  ></ProgressDots>
                </>
              );
            }
            case 'trip': {
              return (
                <>
                  <TripLeg
                    departureTime={item.departureDateTime}
                    departureRealTime={item.departureRealTime}
                    arrivalTime={item.arrivalDateTime}
                    departureStation={item.origin}
                    trainOperator={item.trainOperator}
                    status={item.status}
                    mode={item.mode}
                  ></TripLeg>
                  <ProgressDots
                    numOfDots={computeDots(
                      millisecondsToMinutes(
                        item.arrivalDateTime.valueOf() -
                          item.departureDateTime.valueOf(),
                      ),
                    )}
                  ></ProgressDots>
                </>
              );
            }
            default:
              throw Error('Trip type not found');
          }
        }}
      />
      <TransferLeg
        departureStation={journey.destinationStation}
        departureTime={journey.arrivalTime}
      ></TransferLeg>
    </View>
  );
};

export default LegsScreen;
