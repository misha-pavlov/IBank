import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { screens } from '../config/screens';
import { colors } from '../config/colors';
import CardIcon from '../assets/svg/CardIcon';
import CreditIcon from '../assets/svg/CreditIcon';
import SavingIcon from '../assets/svg/SavingIcon';
import CashbackIcon from '../assets/svg/CashbackIcon';
import MoreIcon from '../assets/svg/MoreIcon';
import CardNavigation from './CardNavigation';

const Tab = createBottomTabNavigator();

const Screen = () => (
  <View>
    <Text>123</Text>
  </View>
);

const IBankTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.black1 },
        tabBarActiveTintColor: colors.red,
      }}>
      <Tab.Screen
        name={screens.app.CardNavigation}
        options={{ headerShown: false, tabBarIcon: ({ color }) => <CardIcon width={24} height={24} fill={color} /> }}
        component={CardNavigation}
      />
      <Tab.Screen
        name="Credits"
        options={{ headerShown: false, tabBarIcon: ({ color }) => <CreditIcon width={24} height={24} fill={color} /> }}
        component={Screen}
      />
      <Tab.Screen
        name="Saving"
        options={{ headerShown: false, tabBarIcon: ({ color }) => <SavingIcon width={24} height={24} fill={color} /> }}
        component={Screen}
      />
      <Tab.Screen
        name="Cashback"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CashbackIcon width={24} height={24} fill={color} />,
        }}
        component={Screen}
      />
      <Tab.Screen
        name="More"
        options={{ headerShown: false, tabBarIcon: ({ color }) => <MoreIcon width={24} height={24} fill={color} /> }}
        component={Screen}
      />
    </Tab.Navigator>
  );
};

export default IBankTabs;
