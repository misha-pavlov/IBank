import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from '../screens/Card/Card';
import { Text, View } from 'react-native';
import { screens } from '../config/screens';

const Tab = createBottomTabNavigator();

const gg = () => (
  <View>
    <Text>123</Text>
  </View>
);

const IBankTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={screens.app.Card} options={{ headerShown: false }} component={Card} />
      <Tab.Screen name="Settings" component={gg} />
    </Tab.Navigator>
  );
};

export default IBankTabs;
