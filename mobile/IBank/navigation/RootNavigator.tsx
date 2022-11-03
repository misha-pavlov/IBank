import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { appEnum, authEnum, cardEnum } from '../config/screens';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import IBankTabs from './IBankTabs';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import { Context } from '../store/store';
import Pin from '../screens/Pin/Pin';
import { emptyBlackWithBackButton } from '../common/navigationOptions';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { state } = useContext(Context);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name={appEnum.Loading}
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
          <RootStack.Screen name={appEnum.Pin} options={{ headerShown: false }} component={Pin} />
          <RootStack.Screen name={cardEnum.Card} options={{ headerShown: false }} component={IBankTabs} />
        </>
      ) : (
        <>
          <RootStack.Screen name={authEnum.SignIn} options={{ headerShown: false }} component={SignIn} />
          <RootStack.Screen name={authEnum.SignUp} options={emptyBlackWithBackButton} component={SignUp} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
