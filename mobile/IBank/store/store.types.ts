import { Dispatch } from 'react';
import { TCard } from '../types/card';

export type TStore = {
  state: {
    isUserLoggedIn: boolean;
    currentCard: TCard;
  };

  action: {
    type: string;
    payload: boolean | TCard;
  };
};

export type TContext = {
  state: TStore['state'];
  dispatch: Dispatch<{ type: string; payload: boolean | TCard }>;
};
