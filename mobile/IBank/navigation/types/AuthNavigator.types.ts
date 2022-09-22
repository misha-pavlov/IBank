import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type NAuthStackParamList = {
  SignUp: undefined;
};

export type NAuthNavigatorRouteProp<ScreenName extends keyof NAuthStackParamList> = RouteProp<
  NAuthStackParamList,
  ScreenName
>;

export type NAuthNavigatorNavigationProp<ScreenName extends keyof NAuthStackParamList> = StackNavigationProp<
  NAuthStackParamList,
  ScreenName
>;

export interface NAuthNavigatorScreenProps<ScreenName extends keyof NAuthStackParamList> {
  route: NAuthNavigatorRouteProp<ScreenName>;
  navigation: NAuthNavigatorNavigationProp<ScreenName>;
}
