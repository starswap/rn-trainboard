import { ApiResponseString } from '../models/apiSchema';
import { Journeys, TravelMode } from '../models/journey';

export function jsonToJourneyDetail(json: ApiResponseString): Journeys {
  return {
    outboundJourneys: json.outboundJourneys.map((outboundJourney) => {
      return {
        departureTime: new Date(outboundJourney.departureTime),
        arrivalTime: new Date(outboundJourney.arrivalTime),
        departureRealTime: new Date(outboundJourney.departureRealTime),
        status: outboundJourney.status,
        originStation: {
          name: outboundJourney.originStation.displayName,
          crs: outboundJourney.originStation.crs,
        },
        destinationStation: {
          name: outboundJourney.destinationStation.displayName,
          crs: outboundJourney.destinationStation.crs,
        },
        primaryTrainOperator: outboundJourney.primaryTrainOperator,
        legs: outboundJourney.legs.map((leg) => {
          switch (leg.type) {
            case 'trip': {
              return {
                type: 'trip',
                mode: TravelMode[leg.mode as keyof typeof TravelMode],
                origin: {
                  name: leg.origin.displayName,
                  crs: leg.origin.crs,
                },
                destination: {
                  name: leg.destination.displayName,
                  crs: leg.destination.crs,
                },
                departureDateTime: new Date(leg.departureDateTime),
                arrivalDateTime: new Date(leg.arrivalDateTime),
                status: leg.status,
                trainOperator: leg.trainOperator,
                departureRealTime: new Date(leg.departureDateTime),
                arrivalRealTime: new Date(leg.arrivalDateTime),
              };
            }
            case 'transfer': {
              return {
                type: 'transfer',
                mode: TravelMode[leg.mode as keyof typeof TravelMode],
                origin: {
                  name: leg.origin.displayName,
                  crs: leg.origin.crs,
                },
                destination: {
                  name: leg.destination.displayName,
                  crs: leg.destination.crs,
                },
                durationInMinutes: leg.durationInMinutes,
              };
            }
          }
        }),
        tickets: outboundJourney.tickets.map((ticket) => {
          return {
            priceInPennies: ticket.priceInPennies,
          };
        }),
      };
    }),
  };
}
