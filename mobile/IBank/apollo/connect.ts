import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import { constants } from '../config/constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'same-origin',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await EncryptedStorage.getItem(constants.keys.USER_JWT);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});