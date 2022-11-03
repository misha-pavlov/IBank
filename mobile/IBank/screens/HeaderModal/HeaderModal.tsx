import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { AddIcon, Avatar, Center, Divider, Flex, HStack, View } from 'native-base';
import React, { useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
// svg
import { Settings } from '../../assets/svg';
// styles
import { WhiteText, GradientCententWrapper, SectionGradient, CardCube } from '../../common/common.styles';
import { BottomBottomScrollableBlock, ScrollBlock } from './HeaderModal.styles';
// components
import { IBankGrayButton } from '../../components';
// constants
import { colors } from '../../config/colors';
import { cardEnum } from '../../config/screens';
// helpers
import { getCardByType } from '../../helpers/cardHelpers';
// hooks
import { useCurrentUser, useScrollHandler } from '../../hooks';
// types
import { NCardNavigatorNavigationProp } from '../../navigation/types/CardNavigator.types';
import { TCard } from '../../types/card';
// gql
import { GET_USER_CARDS } from './gql/HeaderModal.queries';

const HeaderModal = () => {
  const { goBack, canGoBack, navigate } = useNavigation<NCardNavigatorNavigationProp<'EditProfile'>>();
  const scrollHandler = useScrollHandler({ onScrollTop: () => canGoBack() && goBack() });
  const { user } = useCurrentUser();

  const { data: cards, loading } = useQuery(GET_USER_CARDS, { variables: { owner: user?._id } });

  const renderCards = useMemo(() => {
    if (loading || !cards.getUserCards) {
      return <ActivityIndicator color={colors.black} />;
    }

    return (
      <Flex flexDirection="row" justifyContent="space-between" mt={15}>
        {cards?.getUserCards.map((card: TCard) => (
          <TouchableOpacity key={card._id}>
            <CardCube isSelectedCard>{getCardByType(card.type)}</CardCube>
            <WhiteText mt="5px" textAlign="center">
              {card.amount} $
            </WhiteText>
          </TouchableOpacity>
        ))}
      </Flex>
    );
  }, [cards, loading]);

  return (
    <GradientCententWrapper
      colors={[colors.black2, colors.black3, colors.black3]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <Center mt={50}>
        <Avatar
          bg={colors.black}
          size="lg"
          source={{
            uri: user?.image,
          }}>
          FN
          <Avatar.Badge bg={colors.gray100}>
            <TouchableOpacity onPress={() => navigate(cardEnum.EditProfile)}>
              <Settings width={16} height={16} fill={colors.black} />
            </TouchableOpacity>
          </Avatar.Badge>
        </Avatar>
      </Center>

      <Center mt="20px">
        <WhiteText fontWeight={600} fontSize={18}>
          {user?.fullName}
        </WhiteText>
      </Center>

      <HStack mt={25} flexDirection="row" justifyContent="center" space={3}>
        <IBankGrayButton text="💎 Statistics" onPress={() => navigate(cardEnum.Statistic)} w={150} />
        <IBankGrayButton text="💰 Capital" onPress={() => navigate(cardEnum.Capital)} w={150} />
      </HStack>

      <Center mt={25}>
        <SectionGradient
          colors={[colors.gray400, colors.gray500, colors.gray600]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 0.7, y: 0.25 }}
          locations={[1, 0.5, 0]}>
          <WhiteText fontWeight={600} fontSize={16}>
            Your cards
          </WhiteText>

          {renderCards}

          {cards?.getUserCards.length < 3 && (
            <>
              <Divider bg={colors.blueGray700} mt={25} mb={15} />

              <TouchableOpacity onPress={() => navigate(cardEnum.AddNewCard)}>
                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                  <View backgroundColor={colors.gray100} borderRadius={50} p="2px" mr="5px">
                    <AddIcon color={colors.black} size="xs" />
                  </View>

                  <WhiteText>Add a new card</WhiteText>
                </Flex>
              </TouchableOpacity>
            </>
          )}
        </SectionGradient>
      </Center>

      {/* Next block for closing screen on scroll from down to top */}
      <BottomBottomScrollableBlock>
        <ScrollBlock scrollEventThrottle={16} onScroll={scrollHandler} />
      </BottomBottomScrollableBlock>
    </GradientCententWrapper>
  );
};

export default HeaderModal;
