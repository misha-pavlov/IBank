import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { SectionList, View } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { CardListItem } from '../../components';
import { colors } from '../../config/colors';
import { constants } from '../../config/constants';
import { appEnum } from '../../config/screens';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { getCardByType } from '../../helpers/cardHelpers';
import { useCurrentCard, useCurrentUser } from '../../hooks';
import { NCardNavigatorNavigationProp } from '../../navigation/types/CardNavigator.types';
import { CardType, TCard } from '../../types/card';

const TopUp = () => {
  const { setOptions, navigate } = useNavigation<NCardNavigatorNavigationProp<'MoneyOperation'>>();
  const { user } = useCurrentUser();
  const { currentCard } = useCurrentCard();

  useEffect(() => {
    setOptions({ headerTitle: 'Top up your card' });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_USER_CARDS, {
    variables: { owner: user?._id, excludeIds: [currentCard._id] },
  });

  const sections = [
    { title: 'My cards', data: data?.getUserCards },
    { title: 'Another ways', data: [{ type: CardType.SPECIAL }] },
  ];

  const renderItem = useCallback(
    ({ item }: { item: TCard }) => {
      const { type, amount } = item;
      const isMagicCard = type === CardType.SPECIAL;

      return (
        <CardListItem
          type={type}
          amount={amount}
          onPress={() =>
            navigate(appEnum.MoneyOperation, {
              headerTitle: `From ${isMagicCard ? constants.card.magicCard : `${type} card`}`,
              isFromMagicCard: isMagicCard,
              to: currentCard,
              buttonText: 'Send',
              ...(!isMagicCard && { from: item }),
            })
          }
          card={getCardByType(type)}
          {...(isMagicCard && { text: 'Magic card' })}
        />
      );
    },
    [currentCard, navigate],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <View backgroundColor={colors.black}>
        <WhiteText fontWeight={500} fontSize={16} mt="15px" mb="15px">
          {section.title.toUpperCase()}
        </WhiteText>
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <BlackContentWrapper>
        <ActivityIndicator />
      </BlackContentWrapper>
    );
  }

  return (
    <BlackContentWrapper>
      <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
    </BlackContentWrapper>
  );
};

export default TopUp;
