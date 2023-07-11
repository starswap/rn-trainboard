import React from 'react';
import { StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import { TextInput } from 'react-native-paper';

type StationInputProps = {
  label: string;
  station: string;
  setStation: Dispatch<SetStateAction<string>>;
};

const styles = StyleSheet.create({
  textbox: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },
});

const StationInput: React.FC<StationInputProps> = (props) => (
  <TextInput
    style={styles.textbox}
    label={props.label}
    value={props.station}
    onChangeText={(stn) => props.setStation(stn)}
    mode="outlined"
  ></TextInput>
);

export default StationInput;
