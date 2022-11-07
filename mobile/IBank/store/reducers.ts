import { TCard } from '../types/card';
import { actionCases } from './actionCases';
import { TStore } from './store.types';

const reducers = (state: TStore['state'], action: TStore['action']): TStore['state'] => {
  switch (action.type) {
    case actionCases.IS_USER_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: Boolean(action.payload),
      };

    case actionCases.CURRENT_CARD:
      return {
        ...state,
        currentCard: action.payload as TCard,
      };

    default:
      return {
        ...state,
        isUserLoggedIn: false,
      };
  }
};

export default reducers;
