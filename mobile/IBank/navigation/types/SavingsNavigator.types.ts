import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoneyOperationParams } from '../../screens/MoneyOperation/MoneyOperation.types';

export type NSavingsStackParamList = {
  TopUp: { sendOnSaving?: string };
  Savings: undefined;
  CreateSaving: undefined;
  Saving: { savingId: string };
  MoneyOperation: MoneyOperationParams;
};

export type NSavingsNavigatorRouteProp<ScreenName extends keyof NSavingsStackParamList> = RouteProp<
  NSavingsStackParamList,
  ScreenName
>;

export type NSavingsNavigatorNavigationProp<ScreenName extends keyof NSavingsStackParamList> = StackNavigationProp<
  NSavingsStackParamList,
  ScreenName
>;

export interface NSavingsNavigatorScreenProps<ScreenName extends keyof NSavingsStackParamList> {
  route: NSavingsNavigatorRouteProp<ScreenName>;
  navigation: NSavingsNavigatorNavigationProp<ScreenName>;
}
