import { NAppStackParamList } from '../navigation/types/AppNavigator.types';
import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';

export const screens = {
  auth: {
    PinLogin: 'PinLogin',
    SignUp: 'SignUp' as keyof NAuthStackParamList,
    SignIn: 'SignIn',
  },

  app: {
    Card: 'Card' as keyof NAppStackParamList,
    Loading: 'Loading',
    Pin: 'Pin',
  },
};
