import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import SignIn from '../screens/SignIn/SignIn';

const HomeScreen = () => (
  <View>
    <Text>HomeScreen</Text>
  </View>
);

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const chto = false;

  return (
    <RootStack.Navigator>
      {chto ? (
        <>
          <RootStack.Screen name={screens.app.Home} component={HomeScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen
            name={screens.auth.SignIn}
            options={{ headerShown: false }}
            component={SignIn}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
