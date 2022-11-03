import React from 'react';
import { createStackNavigator, StackCardInterpolationProps, StackNavigationOptions } from '@react-navigation/stack';
// constants
import { cardEnum } from '../config/screens';
import { empty, emptyBlackWithBackButton } from '../common/navigationOptions';
// screens
import Card from '../screens/Card/Card';
import HeaderModal from '../screens/HeaderModal/HeaderModal';
import EditProfile from '../screens/EditProfile/EditProfile';
import Statistic from '../screens/Statistic/Statistic';
import Capital from '../screens/Capital/Capital';
import AddNewCard from '../screens/AddNewCard/AddNewCard';
import NewCard from '../screens/NewCard/NewCard';
// types
import { NCardStackParamList } from './types/CardNavigator.types';

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
        name={cardEnum.HeaderModal}
        options={{ headerShown: false, ...verticalAnimation }}
        component={HeaderModal}
      />
      <CardStack.Screen name={cardEnum.EditProfile} options={emptyBlackWithBackButton} component={EditProfile} />
      <CardStack.Screen name={cardEnum.AddNewCard} options={emptyBlackWithBackButton} component={AddNewCard} />
      <CardStack.Screen name={cardEnum.Statistic} options={emptyBlackWithBackButton} component={Statistic} />
      <CardStack.Screen name={cardEnum.Capital} options={emptyBlackWithBackButton} component={Capital} />
      <CardStack.Screen name={cardEnum.NewCard} options={empty} component={NewCard} />
    </CardStack.Navigator>
  );
};

export default CardNavigator;
