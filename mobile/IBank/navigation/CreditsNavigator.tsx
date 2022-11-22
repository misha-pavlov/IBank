import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { creditsEnum } from '../config/screens';
import { Credits } from '../screens';
import { NCreditsStackParamList } from './types/CreditsNavigator.types';

const CreditsStack = createStackNavigator<NCreditsStackParamList>();

const CreditsNavigator = () => (
  <CreditsStack.Navigator>
    <CreditsStack.Screen name={creditsEnum.Credits} options={{ headerShown: false }} component={Credits} />
  </CreditsStack.Navigator>
);

export default CreditsNavigator;
