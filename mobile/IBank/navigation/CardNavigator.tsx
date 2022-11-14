import React from 'react';
import { createStackNavigator, StackCardInterpolationProps, StackNavigationOptions } from '@react-navigation/stack';
import { appEnum, cardEnum } from '../config/screens';
import { empty, emptyBlackWithBackButton } from '../common/navigationOptions';
import { NCardStackParamList } from './types/CardNavigator.types';
import {
  AddNewCard,
  Capital,
  Card,
  EditProfile,
  HeaderModal,
  MoneyOperation,
  NewCard,
  Statistic,
  TopUp,
} from '../screens';

const CardStack = createStackNavigator<NCardStackParamList>();

export const verticalAnimation: StackNavigationOptions = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const CardNavigator = () => {
  return (
    <CardStack.Navigator>
      <CardStack.Screen name={cardEnum.Card} options={{ headerShown: false }} component={Card} />
      <CardStack.Screen
        component={HeaderModal}
        name={cardEnum.HeaderModal}
        options={{ headerShown: false, ...verticalAnimation }}
      />
      <CardStack.Screen name={appEnum.MoneyOperation} options={emptyBlackWithBackButton} component={MoneyOperation} />
      <CardStack.Screen name={cardEnum.EditProfile} options={emptyBlackWithBackButton} component={EditProfile} />
      <CardStack.Screen name={cardEnum.AddNewCard} options={emptyBlackWithBackButton} component={AddNewCard} />
      <CardStack.Screen name={cardEnum.Statistic} options={emptyBlackWithBackButton} component={Statistic} />
      <CardStack.Screen name={cardEnum.Capital} options={emptyBlackWithBackButton} component={Capital} />
      <CardStack.Screen name={cardEnum.TopUp} options={emptyBlackWithBackButton} component={TopUp} />
      <CardStack.Screen name={cardEnum.NewCard} options={empty} component={NewCard} />
    </CardStack.Navigator>
  );
};

export default CardNavigator;