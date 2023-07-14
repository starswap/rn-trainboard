import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Route } from './models/route';
import { Journey } from './models/journey';

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

// Parameters that each screen receives through the route object.
// We pass a Route into details but we don't pass anything into Home or Journey,
// for example
export type RootStackParamList = {
  Home: undefined;
  Details: Route;
  Journey: undefined;
  Legs: { journey: Journey };
};
