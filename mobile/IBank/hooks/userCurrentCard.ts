import { useCallback, useContext } from 'react';
import { actionCases } from '../store/actionCases';
import { Context } from '../store/store';
import { TCard } from './../types/card';

const useCurrentCard = (): {
  currentCard: TCard;
  setCurrentCard: (newCurrentCard?: TCard | undefined) => Promise<void>;
} => {
  const { dispatch, state } = useContext(Context);

  const currentCard = state.currentCard;

  const setCurrentCard = useCallback(
    async (newCurrentCard?: TCard) => {
      if (newCurrentCard) {
        dispatch({ type: actionCases.CURRENT_CARD, payload: newCurrentCard });
      }
    },
    [dispatch],
  );

  return { currentCard, setCurrentCard };
};

export default useCurrentCard;
