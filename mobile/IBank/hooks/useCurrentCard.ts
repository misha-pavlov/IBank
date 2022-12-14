import { useLazyQuery } from '@apollo/client';
import { useCallback, useContext } from 'react';
import { GET_CARD_BY_ID } from '../gql/card.queries';
import { actionCases } from '../store/actionCases';
import { Context } from '../store/store';
import { ApolloFetchPolicy } from '../types/apollo';
import { TCard } from '../types/card';

const useCurrentCard = (): {
  currentCard: TCard;
  setCurrentCard: (newCurrentCard?: TCard | undefined) => void;
  updateCurrentCard: () => Promise<void>;
} => {
  const { dispatch, state } = useContext(Context);

  // use as TCard for fix types
  const currentCard = state.currentCard as TCard;

  const [lazyUpdate] = useLazyQuery(GET_CARD_BY_ID, {
    variables: { _id: currentCard._id },
    fetchPolicy: ApolloFetchPolicy.NetworkOnly,
  });

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
