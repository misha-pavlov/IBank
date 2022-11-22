import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoneyOperationParams } from '../../screens/MoneyOperation/MoneyOperation.types';
import { TCard } from '../../types/card';

export type NCardStackParamList = {
  Card: undefined;
  TopUp: undefined;
  Capital: undefined;
  NewCard: { card: TCard };
  Statistic: undefined;
  SendOnCard: { isFromCardOperations?: boolean };
  AddNewCard: undefined;
  EditProfile: undefined;
  HeaderModal: undefined;
  OtherPayments: undefined;
  MoneyOperation: MoneyOperationParams;
  DoneTransaction: { card: TCard; showSaveCardSwitcher: boolean };
};

export type NCardNavigatorRouteProp<ScreenName extends keyof NCardStackParamList> = RouteProp<
  NCardStackParamList,
  ScreenName
>;

export type NCardNavigatorNavigationProp<ScreenName extends keyof NCardStackParamList> = StackNavigationProp<
  NCardStackParamList,
  ScreenName
>;

export interface NCardNavigatorScreenProps<ScreenName extends keyof NCardStackParamList> {
  route: NCardNavigatorRouteProp<ScreenName>;
  navigation: NCardNavigatorNavigationProp<ScreenName>;
}
