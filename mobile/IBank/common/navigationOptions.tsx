import { ChevronLeftIcon } from 'native-base';
import React from 'react';
import { colors } from '../config/colors';

export const emptyBlackWithBackButton = {
  // use ' ' instead '' because only with this value show without text
  headerBackTitle: ' ',
  headerTitle: '',
  headerTintColor: colors.gray100,
  headerStyle: { backgroundColor: colors.black, shadowColor: colors.black },
  headerBackImage: () => <ChevronLeftIcon ml="16px" color={colors.gray100} size="lg" />,
};
