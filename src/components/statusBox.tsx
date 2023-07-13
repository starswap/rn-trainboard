import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { statusToDisplayStatus } from '../mappers/status-to-display-status';
import { Status } from '../models/status';

const dependentStyles = (displayStatusColor: string) =>
  StyleSheet.create({
    status_container: {
      backgroundColor: displayStatusColor,
      paddingRight: 5,
      paddingLeft: 5,
    },
  });
const styles = StyleSheet.create({
  status_text: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 5,
    color: 'white',
  },
});

type StatusBoxProps = {
  status: Status;
  departureRealTime: Date;
};

export const StatusBox: React.FC<StatusBoxProps> = ({
  status,
  departureRealTime,
}) => {
  const displayStatus = statusToDisplayStatus(status, departureRealTime);
  return (
    <View style={dependentStyles(displayStatus.color).status_container}>
      <Text style={styles.status_text}>{displayStatus.message}</Text>
    </View>
  );
};
