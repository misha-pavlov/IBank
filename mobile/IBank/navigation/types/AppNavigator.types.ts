import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NCardStackParamList } from './CardNavigator.types';

export type NAppStackParamList = {
  CardNavigator: NCardStackParamList;
};

export type NAppNavigatorRouteProp<ScreenName extends keyof NAppStackParamList> = RouteProp<
  NAppStackParamList,
  ScreenName
>;

export type NAppNavigatorNavigationProp<ScreenName extends keyof NAppStackParamList> = StackNavigationProp<
  NAppStackParamList,
  ScreenName
>;

export interface NAppNavigatorScreenProps<ScreenName extends keyof NAppStackParamList> {
  route: NAppNavigatorRouteProp<ScreenName>;
  navigation: NAppNavigatorNavigationProp<ScreenName>;
}
