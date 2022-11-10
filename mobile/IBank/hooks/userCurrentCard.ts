import { useLazyQuery } from '@apollo/client';
import { useCallback, useContext } from 'react';
import { GET_CARD_BY_ID } from '../gql/card.queries';
import { actionCases } from '../store/actionCases';
import { Context } from '../store/store';
import { TCard } from './../types/card';

const useCurrentCard = (): {
  currentCard: TCard;
  setCurrentCard: (newCurrentCard?: TCard | undefined) => Promise<void>;
  updateCurrentCard: () => Promise<void>;
} => {
  const { dispatch, state } = useContext(Context);

  const currentCard = state.currentCard;

  const [lazyUpdate] = useLazyQuery(GET_CARD_BY_ID, { variables: { _id: currentCard._id } });

  const setCurrentCard = useCallback(
    async (newCurrentCard?: TCard) => {
      if (newCurrentCard) {
        dispatch({ type: actionCases.CURRENT_CARD, payload: newCurrentCard });
      }
    },
    [dispatch],
  );

  const updateCurrentCard = useCallback(async () => {
    const { data } = await lazyUpdate();
    setCurrentCard(data.getCardById);
  }, [lazyUpdate, setCurrentCard]);

  return { currentCard, setCurrentCard, updateCurrentCard };
};

export default useCurrentCard;
