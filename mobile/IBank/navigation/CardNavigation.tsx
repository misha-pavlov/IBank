import React from 'react';
import { createStackNavigator, StackCardInterpolationProps, StackNavigationOptions } from '@react-navigation/stack';
import { screens } from '../config/screens';
import Card from '../screens/Card/Card';
import HeaderModal from '../screens/HeaderModal/HeaderModal';
import EditProfile from '../screens/EditProfile/EditProfile';
import { emptyBlackWithBackButton } from '../common/navigationOptions';
import Statistic from '../screens/Statistic/Statistic';
import Capital from '../screens/Capital/Capital';

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
    <CardStack.Navigator>
      <CardStack.Screen name={screens.app.Card} options={{ headerShown: false }} component={Card} />
      <CardStack.Screen
        name={screens.app.HeaderModal}
        options={{ headerShown: false, ...verticalAnimation }}
        component={HeaderModal}
      />
      <CardStack.Screen name={screens.app.EditProfile} options={emptyBlackWithBackButton} component={EditProfile} />
      <CardStack.Screen name={screens.app.Statistic} options={emptyBlackWithBackButton} component={Statistic} />
      <CardStack.Screen name={screens.app.Capital} options={emptyBlackWithBackButton} component={Capital} />
    </CardStack.Navigator>
  );
};

export default CardNavigation;
