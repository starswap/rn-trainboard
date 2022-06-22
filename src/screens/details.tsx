import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
  </View>
);

export default DetailsScreen;
