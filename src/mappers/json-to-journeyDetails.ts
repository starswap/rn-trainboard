import { Journeys, ApiResponseString } from '../models/journeyResponse';

export function jsonToJourneyDetail(json: ApiResponseString): Journeys {
  return {
    outboundJourneys: json.outboundJourneys.map((outboundJourney) => {
      return {
        departureTime: new Date(outboundJourney.departureTime),
        arrivalTime: new Date(outboundJourney.arrivalTime),
        departureRealTime: new Date(outboundJourney.departureRealTime),
        status: outboundJourney.status,
        primaryTrainOperator: outboundJourney.primaryTrainOperator,
        tickets: outboundJourney.tickets.map((ticket) => {
          return {
            priceInPennies: ticket.priceInPennies,
          };
        }),
      };
    }),
  };
}
