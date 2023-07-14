import { Station } from '../models/station';
import { TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';

export function stationToDropdownObject(
  station: Station,
  index: number,
): TAutocompleteDropdownItem {
  return {
    id: index.toString(),
    title: `${station.stationName} (${station.crs})`,
  };
}

export function dropdownObjectToStation(
  dropdownObject: TAutocompleteDropdownItem,
): Station {
  if (dropdownObject && dropdownObject.title) {
    const stationNameAndCRSPattern = /([a-zA-Z ]+) \(([A-Z]{3})\)/;
    const match = dropdownObject.title.match(stationNameAndCRSPattern);
    if (match) {
      return { stationName: match[1], crs: match[2] };
    }
  }
  return { stationName: '', crs: '' };
}
