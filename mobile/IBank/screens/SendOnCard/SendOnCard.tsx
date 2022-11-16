import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Input, SectionList, View } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SectionListData } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { CardListItem } from '../../components';
import { colors } from '../../config/colors';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { getCardByType } from '../../helpers/cardHelpers';
import { useCurrentCard, useCurrentUser } from '../../hooks';
import { TCard } from '../../types/card';
import { GET_USER_SAVED_CARDS } from './SendOnCard.queries';

const SendOnCard = () => {
  const { setOptions } = useNavigation();
  const { user } = useCurrentUser();
  const { currentCard } = useCurrentCard();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setOptions({ headerTitle: 'Send on card' });
  }, [setOptions]);

  const { data: dataGetUserCards, loading: loadingGetUserCards } = useQuery(GET_USER_CARDS, {
    variables: { owner: user?._id, excludeIds: [currentCard._id] },
    skip: !user?._id,
  });

  const { data: dataGetUserSavedCards, loading: loadingGetUserSavedCards } = useQuery(GET_USER_SAVED_CARDS, {
    variables: { userId: user?._id },
    skip: !user?._id,
  });

  const sections = [
    { title: 'My cards', data: dataGetUserCards?.getUserCards },
    { title: 'Saved cards', data: dataGetUserSavedCards?.getUserSavedCards },
  ];

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
    ({ section }: { section: SectionListData<TCard, { title: string; data: unknown[] }> }) =>
      section.data.length > 0 ? (
        <View backgroundColor={colors.black}>
          <WhiteText fontWeight={500} fontSize={16} mt="15px" mb="15px">
            {section.title.toUpperCase()}
          </WhiteText>
        </View>
      ) : null,
    [],
  );

  const onChangeText = useCallback((text: string) => setSearchText(text), []);

  const renderListHeader = useMemo(() => {
    return (
      <View>
        <Input
          size="lg"
          clearTextOnFocus
          value={searchText}
          color={colors.gray100}
          onChangeText={onChangeText}
          placeholder="Search by name, card number"
        />
      </View>
    );
  }, [onChangeText, searchText]);

  if (loadingGetUserCards || loadingGetUserSavedCards) {
    return (
      <BlackContentWrapper>
        <ActivityIndicator />
      </BlackContentWrapper>
    );
  }

  return (
    <BlackContentWrapper>
      {renderListHeader}
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
    </BlackContentWrapper>
  );
};

export default SendOnCard;
