import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import IBankTabs from './IBankTabs';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const chto = false;

  return (
    <RootStack.Navigator>
      {chto ? (
        <>
          <RootStack.Screen name={screens.app.Home} component={IBankTabs} />
        </>
      ) : (
        <>
          <RootStack.Screen
            name={screens.auth.SignIn}
            options={{ headerShown: false }}
            component={SignIn}
          />
          <RootStack.Screen
            name={screens.auth.SignUp}
            options={{ headerShown: false }}
            component={SignUp}
          />
          <RootStack.Screen name={screens.app.Home} component={IBankTabs} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
