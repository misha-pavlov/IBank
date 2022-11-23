import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoneyOperationParams } from '../../screens/MoneyOperation/MoneyOperation.types';

export type NCreditsStackParamList = {
  Credits: undefined;
  CreditSettings: undefined;
  MoneyOperation: MoneyOperationParams;
};

export type NCreditsNavigatorRouteProp<ScreenName extends keyof NCreditsStackParamList> = RouteProp<
  NCreditsStackParamList,
  ScreenName
>;

export type NCreditsNavigatorNavigationProp<ScreenName extends keyof NCreditsStackParamList> = StackNavigationProp<
  NCreditsStackParamList,
  ScreenName
>;

export interface NCreditsNavigatorScreenProps<ScreenName extends keyof NCreditsStackParamList> {
  route: NCreditsNavigatorRouteProp<ScreenName>;
  navigation: NCreditsNavigatorNavigationProp<ScreenName>;
}
