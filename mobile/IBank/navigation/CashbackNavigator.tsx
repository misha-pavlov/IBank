import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { emptyBlackWithoutBackButton } from '../common/navigationOptions';
import { cashbackEnum } from '../config/screens';
import { Cashback } from '../screens';
import { NCashbackStackParamList } from './types/CashbackNavigator.types';

const CashbackStack = createStackNavigator<NCashbackStackParamList>();

const CashbackNavigator = () => (
  <CashbackStack.Navigator>
    <CashbackStack.Screen name={cashbackEnum.Cashback} options={emptyBlackWithoutBackButton} component={Cashback} />
  </CashbackStack.Navigator>
);

export default CashbackNavigator;
