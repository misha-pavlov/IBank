import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { emptyBlackWithBackButton, emptyBlackWithoutBackButton } from '../common/navigationOptions';
import { moreEnum } from '../config/screens';
import { CustomerService, Invite, More } from '../screens';
import { NMoreStackParamList } from './types/MoreNavigator.types';

const MoreStack = createStackNavigator<NMoreStackParamList>();

const MoresNavigator = () => (
  <MoreStack.Navigator>
    <MoreStack.Screen name={moreEnum.More} options={emptyBlackWithoutBackButton} component={More} />
    <MoreStack.Screen name={moreEnum.Invite} options={emptyBlackWithBackButton} component={Invite} />
    <MoreStack.Screen name={moreEnum.CustomerService} options={emptyBlackWithBackButton} component={CustomerService} />
  </MoreStack.Navigator>
);

export default MoresNavigator;
