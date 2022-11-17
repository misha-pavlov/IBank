import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Input, SectionList, View } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SectionListData } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { CardListItem, IBankBlackButton } from '../../components';
import { colors } from '../../config/colors';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { getCardByType } from '../../helpers/cardHelpers';
import { useCurrentCard, useCurrentUser, useDebounced } from '../../hooks';
import { ApolloFetchPolicy } from '../../types/apollo';
import { TCard } from '../../types/card';
import { GET_USER_SAVED_CARDS } from './SendOnCard.queries';

const SendOnCard = () => {
  const { setOptions } = useNavigation();
  const { user } = useCurrentUser();
  const { currentCard } = useCurrentCard();

  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounced(searchTerm);

  useEffect(() => {
    setOptions({ headerTitle: 'Send on card' });
  }, [setOptions]);

  const { data: dataGetUserCards, loading: loadingGetUserCards } = useQuery(GET_USER_CARDS, {
    variables: { owner: user?._id, searchTerm: debounced, excludeIds: [currentCard._id] },
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    nextFetchPolicy: ApolloFetchPolicy.CacheFirst,
    skip: !user?._id,
  });

  const { data: dataGetUserSavedCards, loading: loadingGetUserSavedCards } = useQuery(GET_USER_SAVED_CARDS, {
    variables: { userId: user?._id, searchTerm: debounced },
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    nextFetchPolicy: ApolloFetchPolicy.CacheFirst,
    skip: !user?._id,
  });

  const sections = useMemo(
    () => [
      { title: 'My cards', data: dataGetUserCards?.getUserCards },
      { title: 'Saved cards', data: dataGetUserSavedCards?.getUserSavedCards || [] },
    ],
    [dataGetUserCards?.getUserCards, dataGetUserSavedCards?.getUserSavedCards],
  );

  const renderItem = useCallback(({ item }: { item: TCard }) => {
    const { type, number, ownerFullName } = item;

    return (
      <CardListItem
        text={ownerFullName}
        underText={number.replace(number.substring(6, 12), '****')}
        onPress={() => console.log('PRESSED')}
        card={getCardByType(type)}
      />
    );
  }, []);

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
      <View>
        <Input
          size="lg"
          value={searchTerm}
          color={colors.gray100}
          onChangeText={onChangeText}
          placeholder="Search by name, card number"
        />
      </View>
    );
  }, [onChangeText, searchTerm]);

  const renderSectionList = useMemo(() => {
    if (loadingGetUserCards || loadingGetUserSavedCards) {
      return <ActivityIndicator />;
    }

    if (
      debounced.length === 16 &&
      dataGetUserCards?.getUserCards.length === 0 &&
      dataGetUserSavedCards?.getUserSavedCards.length === 0
    ) {
      return (
        <View pt="16px">
          <IBankBlackButton
            text={`Send on card ${debounced.replace(debounced.substring(6, 12), '****')}`}
            onPress={() => console.log('123')}
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
    loadingGetUserCards,
    loadingGetUserSavedCards,
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
