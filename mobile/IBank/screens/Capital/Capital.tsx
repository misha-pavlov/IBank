import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Stack, Text, View } from 'native-base';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { BagIcon } from '../../assets/svg';
import { GradientCententWrapper, SectionGradient, TransparentBox, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { getCardByType } from '../../helpers/cardHelpers';
import { useCurrentUser } from '../../hooks';
import { TCard } from '../../types/card';
import { GET_USER_CAPITAL } from './gql/Capital.queries';

const Capital = () => {
  const { width } = useWindowDimensions();
  const { setOptions } = useNavigation();
  const { user } = useCurrentUser();
  const transparentBoxWidth = width * 0.4;

  const { data, loading } = useQuery(GET_USER_CARDS, { variables: { owner: user?._id } });
  const { data: capital, loading: loadingCapital } = useQuery(GET_USER_CAPITAL, { variables: { owner: user?._id } });

  const renderCardBoxes = useMemo(() => {
    if (loading || !data?.getUserCards) {
      return <ActivityIndicator />;
    }

    return data?.getUserCards.map((card: TCard, index: number) => (
      <TransparentBox
        key={card._id}
        w={transparentBoxWidth}
        height={transparentBoxWidth - 20}
        justifyContent="center"
        p={24}
        {...((index + 1) % 2 !== 0 && { mr: '12%', mb: '12%' })}>
        {getCardByType(card.type, 45)}
        <Text color={colors.blueGray500}>{card.type}</Text>
        <WhiteText fontWeight={600} fontSize={20}>
          {card.amount} $
        </WhiteText>
      </TransparentBox>
    ));
  }, [data?.getUserCards, loading, transparentBoxWidth]);

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkGreen, shadowColor: colors.darkGreen } });
  }, [setOptions]);

  return (
    <GradientCententWrapper
      colors={[colors.darkGreen, colors.darkGreen1, colors.darkGreen1]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <WhiteText fontSize={20} fontWeight={600} mb="20px">
        Capital
      </WhiteText>

      <SectionGradient
        colors={[colors.darkGreen2, colors.darkGreen3, colors.darkGreen4]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 0.7, y: 0.25 }}
        locations={[1, 0.5, 0]}>
        <View alignItems="flex-start">
          <View backgroundColor={colors.aqua} p="8px" mb="10px" borderRadius={50}>
            <BagIcon width={25} height={25} />
          </View>
        </View>

        <WhiteText fontSize={16}>Sum</WhiteText>
        {loadingCapital ? (
          <ActivityIndicator />
        ) : (
          <WhiteText fontSize={25} fontWeight={600}>
            {capital.getUserCapital} $
          </WhiteText>
        )}
      </SectionGradient>

      <Stack direction="row" flexWrap="wrap" mt={25}>
        {renderCardBoxes}
      </Stack>
    </GradientCententWrapper>
  );
};

export default Capital;
