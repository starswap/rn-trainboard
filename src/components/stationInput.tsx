import React from 'react';
import { View } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import { Station } from '../models/station';
import {
  stationToDropdownObject,
  dropdownObjectToStation,
} from '../mappers/station-to-dropdown-object';

type StationInputProps = {
  label: string;
  setStation: Dispatch<SetStateAction<Station>>;
};

const StationInput: React.FC<StationInputProps> = (props) => {
  const allowedStations: Station[] = [
    { stationName: 'Liphook', crs: 'LIP' },
    { stationName: 'Waterloo', crs: 'WAT' },
    { stationName: 'Watford Junction', crs: 'WFJ' },
    { stationName: 'Cambridge', crs: 'CBG' },
    { stationName: 'Edinburgh', crs: 'EDB' },
  ];
  return (
    <View>
      <AutocompleteDropdown
        textInputProps={{ placeholder: props.label }}
        emptyResultText="No station found"
        suggestionsListMaxHeight={150}
        clearOnFocus={true}
        closeOnBlur={true}
        closeOnSubmit={true}
        onSelectItem={(selectedStation: TAutocompleteDropdownItem) =>
          props.setStation(dropdownObjectToStation(selectedStation))
        }
        dataSet={allowedStations.map(stationToDropdownObject)}
      />
    </View>
  );
};

export default StationInput;
