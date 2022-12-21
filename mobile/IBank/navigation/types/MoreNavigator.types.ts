import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type NMoreStackParamList = {
  More: undefined;
  Invite: undefined;
  CustomerService: undefined;
};

export type NMoreNavigatorRouteProp<ScreenName extends keyof NMoreStackParamList> = RouteProp<
  NMoreStackParamList,
  ScreenName
>;

export type NMoreNavigatorNavigationProp<ScreenName extends keyof NMoreStackParamList> = StackNavigationProp<
  NMoreStackParamList,
  ScreenName
>;

export interface NMoreNavigatorScreenProps<ScreenName extends keyof NMoreStackParamList> {
  route: NMoreNavigatorRouteProp<ScreenName>;
  navigation: NMoreNavigatorNavigationProp<ScreenName>;
}
