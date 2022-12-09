import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type NCashbackStackParamList = {
  Cashback: undefined;
};

export type NCashbackNavigatorRouteProp<ScreenName extends keyof NCashbackStackParamList> = RouteProp<
  NCashbackStackParamList,
  ScreenName
>;

export type NCashbackNavigatorNavigationProp<ScreenName extends keyof NCashbackStackParamList> = StackNavigationProp<
  NCashbackStackParamList,
  ScreenName
>;

export interface NCashbackNavigatorScreenProps<ScreenName extends keyof NCashbackStackParamList> {
  route: NCashbackNavigatorRouteProp<ScreenName>;
  navigation: NCashbackNavigatorNavigationProp<ScreenName>;
}
