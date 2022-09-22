import React, { useReducer, createContext } from 'react';
import reducers from './reducers';
import { TContext } from './store.types';

const initialState = {
  isUserLoggedIn: false,
};

const Store = ({ children }: { children: JSX.Element }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducers, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export const Context = createContext<TContext>({
  state: initialState,
  dispatch: () => null,
});

export default Store;
