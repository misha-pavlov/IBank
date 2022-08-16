import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../config/screens';
import SignUp from '../screens/SignUp/SignUp';

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
            name={screens.auth.SignUp}
            options={{ headerShown: false }}
            component={SignUp}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
