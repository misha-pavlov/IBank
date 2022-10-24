/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { ApolloProvider } from '@apollo/client';
import RootNavigator from './navigation/RootNavigator';
import Store from './store/store';
import { client } from './apollo/connect';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Store>
        <NavigationContainer>
          <NativeBaseProvider>
            <RootNavigator />
          </NativeBaseProvider>
        </NavigationContainer>
      </Store>
    </ApolloProvider>
  );
};

export default App;
