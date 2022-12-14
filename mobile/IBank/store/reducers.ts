import { actionCases } from './actionCases';
import { TStore } from './store.types';

const reducers = (state: TStore['state'], action: TStore['action']): TStore['state'] => {
  switch (action.type) {
    case actionCases.IS_USER_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };

    case actionCases.CURRENT_CARD:
      return {
        ...state,
        currentCard: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducers;
