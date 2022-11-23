import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { emptyBlackWithBackButton, emptyBlackWithoutBackButton } from '../common/navigationOptions';
import { appEnum, savingsEnum } from '../config/screens';
import { MoneyOperation, Savings } from '../screens';
import { NSavingsStackParamList } from './types/SavingsNavigator.types';

const SavingsStack = createStackNavigator<NSavingsStackParamList>();

const SavingsNavigator = () => (
  <SavingsStack.Navigator>
    <SavingsStack.Screen name={savingsEnum.Savings} options={emptyBlackWithoutBackButton} component={Savings} />
    <SavingsStack.Screen name={appEnum.MoneyOperation} options={emptyBlackWithBackButton} component={MoneyOperation} />
  </SavingsStack.Navigator>
);

export default SavingsNavigator;
