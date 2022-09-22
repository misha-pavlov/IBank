import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import IBankTabs from './IBankTabs';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import { Context } from '../store/store';
import Pin from '../screens/Pin/Pin';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { state } = useContext(Context);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name={screens.app.Loading}
          options={{ headerShown: false }}
          component={() => <LoadingScreen setLoading={setLoading} />}
        />
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator>
      {state.isUserLoggedIn ? (
        <>
          <RootStack.Screen name={screens.app.Pin} options={{ headerShown: false }} component={Pin} />
          <RootStack.Screen name={screens.app.Card} options={{ headerShown: false }} component={IBankTabs} />
        </>
      ) : (
        <>
          <RootStack.Screen name={screens.auth.SignIn} options={{ headerShown: false }} component={SignIn} />
          <RootStack.Screen name={screens.auth.SignUp} options={{ headerShown: false }} component={SignUp} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
