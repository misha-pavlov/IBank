import React, { useReducer, createContext } from 'react';
import { TCard } from '../types/card';
import reducers from './reducers';
import { TContext } from './store.types';

const initialState = {
  isUserLoggedIn: false,
  currentCard: {} as TCard,
};

const Store = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export const Context = createContext<TContext>({
  state: initialState,
  dispatch: () => null,
});

export default Store;
