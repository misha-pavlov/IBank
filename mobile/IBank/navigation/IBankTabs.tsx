import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const gg = () => (
  <View>
    <Text>123</Text>
  </View>
);

const IBankTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={gg} />
    </Tab.Navigator>
  );
};

export default IBankTabs;
