import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { isEqual } from 'lodash';
import React, { memo, useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// styles
import { BlackContentWrapper } from '../../common/common.styles';
// conponents
import { CardListItem } from '../../components';
// constants
import { appEnum } from '../../config/screens';
// gql
import { GET_CARD_BY_ID, GET_USER_CARDS } from '../../gql/card.queries';
import { BREAK_SAVING, WITHDRAW_PART } from '../../gql/saving.mutations';
import { GET_SAVINGS_FOR_USER, GET_SAVING_BY_ID, GET_USER_SAVINGS_SAVED_SUM } from '../../gql/saving.queries';
import { GET_CARD_TRANSACTIONS } from '../Card/screens/Amount/Amount.queries';
// helpers
import { getCardByType } from '../../helpers/cardHelpers';
// hookes
import { useCurrentCard, useCurrentUser } from '../../hooks';
// types
import {
  NSavingsNavigatorNavigationProp,
  NSavingsNavigatorRouteProp,
} from '../../navigation/types/SavingsNavigator.types';
import { TCard } from '../../types/card';

const SavingCardSelection = () => {
  const { user } = useCurrentUser();
  const { currentCard, updateCurrentCard } = useCurrentCard();
  const { setOptions, navigate, pop } = useNavigation<NSavingsNavigatorNavigationProp<'MoneyOperation'>>();
  const { params } = useRoute<NSavingsNavigatorRouteProp<'SavingCardSelection'>>();
  const { savingId } = params;

  useEffect(() => {
    setOptions({ headerTitle: 'Select one of your cards' });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_USER_CARDS, {
    variables: { owner: user?._id },
    skip: !user?._id,
  });
  const [withdrawPartMutate] = useMutation(WITHDRAW_PART, { onError: err => console.error('WITHDRAW_PART = ', err) });
  const [breakSavingMutate] = useMutation(BREAK_SAVING, { onError: err => console.error('BREAK_SAVING = ', err) });

  const onPress = useCallback(
    (item: TCard) => {
      if (params?.isBreakSaving) {
        return breakSavingMutate({
          variables: { savingId, to: item._id },
          refetchQueries: [
            { query: GET_SAVING_BY_ID, variables: { savingId } },
            { query: GET_CARD_BY_ID, variables: { _id: currentCard._id } },
            { query: GET_SAVINGS_FOR_USER, variables: { owner: user?._id } },
            { query: GET_USER_SAVINGS_SAVED_SUM, variables: { owner: user?._id } },
            { query: GET_CARD_TRANSACTIONS, variables: { cardId: item._id, searchTerm: '' } },
            { query: GET_USER_CARDS, variables: { owner: user?._id, excludeIds: [currentCard._id] } },
          ],
          awaitRefetchQueries: true,
          onCompleted: async () => {
            try {
              await updateCurrentCard();
            } catch (error) {
              console.error(error);
            }

            pop(3);
          },
        });
      }

      return navigate(appEnum.MoneyOperation, {
        to: item,
        sendOnSaving: savingId,
        buttonText: 'Withdraw',
        onUpdate: withdrawPartMutate,
        headerTitle: 'Withdraw part from saving',
        getVariables: amount => ({ savingId, to: item._id, amount }),
      });
    },
    [
      breakSavingMutate,
      currentCard._id,
      navigate,
      params?.isBreakSaving,
      pop,
      savingId,
      updateCurrentCard,
      user?._id,
      withdrawPartMutate,
    ],
  );

  const renderItem = useCallback(
    ({ item }: { item: TCard }) => (
      <CardListItem type={item.type} card={getCardByType(item.type)} onPress={() => onPress(item)} />
    ),
    [onPress],
  );

  return (
    <BlackContentWrapper>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlashList data={data?.getUserCards} estimatedItemSize={69} renderItem={renderItem} />
      )}
    </BlackContentWrapper>
  );
};

export default memo(SavingCardSelection, isEqual);
