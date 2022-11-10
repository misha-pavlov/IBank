import { Dimensions, Platform } from 'react-native';

const IPHONEX_HEIGHT = 812;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

export const isIphoneX = (): boolean => isIOS() && SCREEN_HEIGHT >= IPHONEX_HEIGHT;

export const getKeyboardVerticalOffset = (): number => {
  return Platform.select({
    ios: isIphoneX() ? 100 : 80,
    default: 0,
  });
};
