import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { emptyBlackWithBackButton, emptyBlackWithoutBackButton } from '../common/navigationOptions';
import { appEnum, cardEnum, savingsEnum } from '../config/screens';
import { MoneyOperation, Savings, CreateSaving, Saving, TopUp, SavingSettings } from '../screens';
import { NSavingsStackParamList } from './types/SavingsNavigator.types';

const SavingsStack = createStackNavigator<NSavingsStackParamList>();

const SavingsNavigator = () => (
  <SavingsStack.Navigator>
    <SavingsStack.Screen name={savingsEnum.Savings} options={emptyBlackWithoutBackButton} component={Savings} />
    <SavingsStack.Screen name={cardEnum.TopUp} options={emptyBlackWithBackButton} component={TopUp} />
    <SavingsStack.Screen name={savingsEnum.Saving} options={emptyBlackWithBackButton} component={Saving} />
    <SavingsStack.Screen name={savingsEnum.CreateSaving} options={emptyBlackWithBackButton} component={CreateSaving} />
    <SavingsStack.Screen name={appEnum.MoneyOperation} options={emptyBlackWithBackButton} component={MoneyOperation} />
    <SavingsStack.Screen
      name={savingsEnum.SavingSettings}
      options={emptyBlackWithBackButton}
      component={SavingSettings}
    />
  </SavingsStack.Navigator>
);

export default SavingsNavigator;
