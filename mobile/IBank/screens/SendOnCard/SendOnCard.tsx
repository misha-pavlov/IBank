import { useLazyQuery, useQuery } from '@apollo/client';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Input, SectionList, useToast, View } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SectionListData } from 'react-native';
// styles
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
// components
import { CardListItem, IBankBlackButton } from '../../components';
// constants
import { colors } from '../../config/colors';
import { appEnum, cardEnum } from '../../config/screens';
import { ApolloFetchPolicy } from '../../types/apollo';
// gql
import { GET_USER_CARDS } from '../../gql/card.queries';
import { GET_USER_SAVED_CARDS } from '../../gql/user.queries';
import { IS_CARD_EXIST } from './SendOnCard.queries';
// helpers
import { getCardByType } from '../../helpers/cardHelpers';
// hooks
import { useCurrentCard, useCurrentUser, useDebounced } from '../../hooks';
// types
import { NCardNavigatorNavigationProp, NCardNavigatorRouteProp } from '../../navigation/types/CardNavigator.types';
import { TCard } from '../../types/card';

const SendOnCard = () => {
  const toast = useToast();
  const { setOptions, navigate, dispatch } =
    useNavigation<NCardNavigatorNavigationProp<'MoneyOperation' | 'DoneTransaction'>>();
  const { params } = useRoute<NCardNavigatorRouteProp<'SendOnCard'>>();
  const { user, savedCardsIds } = useCurrentUser();
  const { currentCard } = useCurrentCard();

  const { isFromCardOperations } = params;

  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounced(searchTerm);

  useEffect(() => {
    setOptions({ headerTitle: 'Send on card' });
  }, [setOptions]);

  const { data: dataGetUserCards, loading: loadingGetUserCards } = useQuery(GET_USER_CARDS, {
    variables: { owner: user?._id, searchTerm: debounced, excludeIds: [currentCard._id] },
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    nextFetchPolicy: ApolloFetchPolicy.CacheFirst,
    skip: !user?._id || isFromCardOperations,
  });

  const { data: dataGetUserSavedCards, loading: loadingGetUserSavedCards } = useQuery(GET_USER_SAVED_CARDS, {
    variables: { userId: user?._id, searchTerm: debounced },
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    nextFetchPolicy: ApolloFetchPolicy.CacheFirst,
    skip: !user?._id || isFromCardOperations,
  });

  const [isCardExistLazy] = useLazyQuery(IS_CARD_EXIST, { onError: err => console.error('IS_CARD_EXIST = ', err) });

  const sections = useMemo(
    () => [
      { title: 'My cards', data: dataGetUserCards?.getUserCards || [] },
      { title: 'Saved cards', data: dataGetUserSavedCards?.getUserSavedCards || [] },
    ],
    [dataGetUserCards?.getUserCards, dataGetUserSavedCards?.getUserSavedCards],
  );

  const onReplace = useCallback(
    (card: TCard, isUserCard: boolean) => {
      // Success, move to homepage.
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          {
            name: cardEnum.DoneTransaction,
            params: { card, showSaveCardSwitcher: !savedCardsIds.includes(card._id) && !isUserCard },
          },
        ],
      });
      dispatch(resetAction);
    },
    [dispatch, savedCardsIds],
  );

  const moveToDoneTransaction = useCallback(
    (cardTo: TCard, isUserCard: boolean) => {
      return navigate(appEnum.MoneyOperation, {
        buttonText: 'Send',
        to: cardTo,
        from: currentCard,
        headerTitle: 'How much?',
        onComplete: () => onReplace(cardTo, isUserCard),
      });
    },
    [currentCard, navigate, onReplace],
  );

  const onUnknownCard = useCallback(() => {
    isCardExistLazy({
      variables: { number: Number(debounced) },
      onCompleted: ({ isCardExist }) => {
        if (!isCardExist) {
          toast.show({
            placement: 'top',
            render: () => {
              return (
                <View bg={colors.red} px="2" py="1" rounded="sm" mt={10}>
                  <WhiteText>This card is not exist</WhiteText>
                </View>
              );
            },
          });
        } else {
          moveToDoneTransaction(isCardExist, false);
        }
      },
    });
  }, [debounced, isCardExistLazy, moveToDoneTransaction, toast]);

  const renderItem = useCallback(
    ({ item }: { item: TCard }) => {
      const { type, number, ownerFullName } = item;

      return (
        <CardListItem
          text={ownerFullName}
          underText={number.replace(number.substring(6, 12), '****')}
          onPress={() => moveToDoneTransaction(item, true)}
          card={getCardByType(type)}
        />
      );
    },
    [moveToDoneTransaction],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<TCard, { title: string; data: TCard[] }> }) =>
      section.data.length > 0 ? (
        <View backgroundColor={colors.black}>
          <WhiteText fontWeight={500} fontSize={16} mt="15px" mb="15px">
            {section.title.toUpperCase()}
          </WhiteText>
        </View>
      ) : null,
    [],
  );

  const onChangeText = useCallback((text: string) => setSearchTerm(text), []);

  const renderListHeader = useMemo(() => {
    return (
      <Input
        size="lg"
        maxLength={16}
        value={searchTerm}
        variant="underlined"
        color={colors.gray100}
        onChangeText={onChangeText}
        placeholder={isFromCardOperations ? 'Enter card number' : 'Search by name, card number'}
      />
    );
  }, [isFromCardOperations, onChangeText, searchTerm]);

  const renderSectionList = useMemo(() => {
    if (loadingGetUserCards || loadingGetUserSavedCards) {
      return <ActivityIndicator />;
    }

    if (
      debounced.length === 16 &&
      (isFromCardOperations ||
        (dataGetUserCards?.getUserCards.length === 0 && dataGetUserSavedCards?.getUserSavedCards.length === 0))
    ) {
      return (
        <View pt="16px">
          <IBankBlackButton
            text={`Send on card ${debounced.replace(debounced.substring(6, 12), '****')}`}
            onPress={onUnknownCard}
          />
        </View>
      );
    }

    return (
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={() => (
          <View>
            <WhiteText textAlign="center">No cards</WhiteText>
          </View>
        )}
      />
    );
  }, [
    dataGetUserCards?.getUserCards.length,
    dataGetUserSavedCards?.getUserSavedCards.length,
    debounced,
    isFromCardOperations,
    loadingGetUserCards,
    loadingGetUserSavedCards,
    onUnknownCard,
    renderItem,
    renderSectionHeader,
    sections,
  ]);

  return (
    <BlackContentWrapper>
      {renderListHeader}
      {renderSectionList}
    </BlackContentWrapper>
  );
};

export default SendOnCard;
