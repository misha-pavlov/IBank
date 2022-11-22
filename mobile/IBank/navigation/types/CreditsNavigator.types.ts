import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type NCreditsStackParamList = {
  Credits: undefined;
};

export type NCreditsNavigatorRouteProp<ScreenName extends keyof NCreditsStackParamList> = RouteProp<
  NCreditsStackParamList,
  ScreenName
>;

export type NCreditsNavigatorNavigationProp<ScreenName extends keyof NCreditsStackParamList> = StackNavigationProp<
  NCreditsStackParamList,
  ScreenName
>;

export interface NCardNavigatorScreenProps<ScreenName extends keyof NCreditsStackParamList> {
  route: NCreditsNavigatorRouteProp<ScreenName>;
  navigation: NCreditsNavigatorNavigationProp<ScreenName>;
}
