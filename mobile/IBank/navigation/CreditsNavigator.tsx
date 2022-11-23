import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { emptyBlackWithBackButton, emptyBlackWithoutBackButton } from '../common/navigationOptions';
import { creditsEnum } from '../config/screens';
import { Credits, CreditSettings } from '../screens';
import { NCreditsStackParamList } from './types/CreditsNavigator.types';

const CreditsStack = createStackNavigator<NCreditsStackParamList>();

const CreditsNavigator = () => (
  <CreditsStack.Navigator>
    <CreditsStack.Screen name={creditsEnum.Credits} options={emptyBlackWithoutBackButton} component={Credits} />
    <CreditsStack.Screen
      name={creditsEnum.CreditSettings}
      options={emptyBlackWithBackButton}
      component={CreditSettings}
    />
  </CreditsStack.Navigator>
);

export default CreditsNavigator;
