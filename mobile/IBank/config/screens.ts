import { NAppStackParamList } from '../navigation/types/AppNavigator.types';
import { NAuthStackParamList } from '../navigation/types/AuthNavigator.types';

export const screens = {
  auth: {
    SignUp: 'SignUp' as keyof NAuthStackParamList,
    SignIn: 'SignIn',
    PinLogin: 'PinLogin',
  },

  app: {
    Card: 'Card' as keyof NAppStackParamList,
    Statistic: 'Statistic' as keyof NAppStackParamList,
    HeaderModal: 'HeaderModal' as keyof NAppStackParamList,
    EditProfile: 'EditProfile' as keyof NAppStackParamList,
    CardNavigation: 'CardNavigation' as keyof NAppStackParamList,
    Pin: 'Pin',
    Loading: 'Loading',
  },
};
