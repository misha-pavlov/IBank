import React from 'react';
import { createStackNavigator, StackCardInterpolationProps, StackNavigationOptions } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Card from '../screens/Card/Card';
import HeaderModal from '../screens/HeaderModal/HeaderModal';

const CardStack = createStackNavigator();

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

const CardNavigation = () => {
  return (
    <CardStack.Navigator screenOptions={verticalAnimation}>
      <CardStack.Screen name={screens.app.Card1} options={{ headerShown: false }} component={Card} />
      <CardStack.Screen name={screens.app.HeaderModal} options={{ headerShown: false }} component={HeaderModal} />
    </CardStack.Navigator>
  );
};

export default CardNavigation;
