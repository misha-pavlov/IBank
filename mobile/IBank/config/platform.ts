import { Dimensions, Platform } from 'react-native';

const IPHONEX_HEIGHT = 812;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

export const isIphoneX = (): boolean =>
  isIOS() && SCREEN_HEIGHT >= IPHONEX_HEIGHT;

export const getKeyboardVerticalOffsetForSignUp = (
  isPhoneStage: boolean,
): number => {
  const iphoneXOffset = isPhoneStage ? -130 : -30;
  return Platform.select({
    ios: isIphoneX() ? iphoneXOffset : 80,
    default: 0,
  });
};
