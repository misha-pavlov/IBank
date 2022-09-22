import { Platform } from 'react-native';
import { isIphoneX } from '../../../config/platform';

export const getKeyboardVerticalOffsetForSignUp = (isPhoneStage: boolean): number => {
  const iphoneXOffset = isPhoneStage ? -110 : -30;
  return Platform.select({
    ios: isIphoneX() ? iphoneXOffset : 80,
    default: 0,
  });
};
