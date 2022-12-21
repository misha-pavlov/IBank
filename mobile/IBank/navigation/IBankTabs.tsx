import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appEnum, cardEnum, cashbackEnum, creditsEnum, moreEnum, savingsEnum } from '../config/screens';
import { colors } from '../config/colors';
import { CardIcon, CashbackIcon, CreditIcon, MoreIcon, SavingIcon } from '../assets/svg';
import { CardNavigator, CashbackNavigator, CreditsNavigator, MoreNavigator, SavingsNavigator } from '.';

const Tab = createBottomTabNavigator();

const IBankTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.black1 },
        tabBarActiveTintColor: colors.red,
      }}>
      <Tab.Screen
        name={appEnum.CardNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CardIcon fill={color} />,
          title: cardEnum.Card,
        }}
        component={CardNavigator}
      />
      <Tab.Screen
        name={appEnum.CreditsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CreditIcon fill={color} />,
          title: creditsEnum.Credits,
        }}
        component={CreditsNavigator}
      />
      <Tab.Screen
        name={appEnum.SavingsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SavingIcon fill={color} />,
          title: savingsEnum.Savings,
        }}
        component={SavingsNavigator}
      />
      <Tab.Screen
        name={appEnum.CashbackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CashbackIcon fill={color} />,
          title: cashbackEnum.Cashback,
        }}
        component={CashbackNavigator}
      />
      <Tab.Screen
        name={appEnum.MoreNavigator}
        options={{ headerShown: false, tabBarIcon: ({ color }) => <MoreIcon fill={color} />, title: moreEnum.More }}
        component={MoreNavigator}
      />
    </Tab.Navigator>
  );
};

export default IBankTabs;
