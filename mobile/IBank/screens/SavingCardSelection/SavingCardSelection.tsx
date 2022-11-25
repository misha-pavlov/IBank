import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackContentWrapper } from '../../common/common.styles';
import { CardListItem } from '../../components';
import { appEnum } from '../../config/screens';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { WITHDRAW_PART } from '../../gql/saving.mutations';
import { getCardByType } from '../../helpers/cardHelpers';
import { useCurrentUser } from '../../hooks';
import {
  NSavingsNavigatorNavigationProp,
  NSavingsNavigatorRouteProp,
} from '../../navigation/types/SavingsNavigator.types';
import { TCard } from '../../types/card';

const SavingCardSelection = () => {
  const { user } = useCurrentUser();
  const { setOptions, navigate } = useNavigation<NSavingsNavigatorNavigationProp<'MoneyOperation'>>();
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

  const renderItem = useCallback(
    ({ item }: { item: TCard }) => (
      <CardListItem
        type={item.type}
        card={getCardByType(item.type)}
        onPress={() =>
          navigate(appEnum.MoneyOperation, {
            to: item,
            sendOnSaving: savingId,
            buttonText: 'Withdraw',
            onUpdate: withdrawPartMutate,
            headerTitle: 'Withdraw part from saving',
            getVariables: amount => ({ savingId, to: item._id, amount }),
          })
        }
      />
    ),
    [navigate, savingId, withdrawPartMutate],
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

export default SavingCardSelection;
