import { Dimensions, Platform } from 'react-native';

const IPHONEX_HEIGHT = 812;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

export const isIphoneX = (): boolean =>
  isIOS() && SCREEN_HEIGHT >= IPHONEX_HEIGHT;
