import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Center, View } from 'native-base';
import React, { useCallback } from 'react';
import PieChart from 'react-native-pie-chart';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { NSavingsNavigatorRouteProp } from '../../navigation/types/SavingsNavigator.types';
import { groupSavedFromCards } from './helpers';

const SavingStatistic = () => {
  const { params } = useRoute<NSavingsNavigatorRouteProp<'SavingStatistic'>>();
  const { savedFromCards } = params;
  const groupedSavedFromCards = groupSavedFromCards(savedFromCards);

  const sliceColor = [colors.blueGray1, colors.red1, colors.blueYellow1, colors.green2];

  const renderItem = useCallback(
    ({ item }: { item: { number: string; amount: number } }) => (
      <WhiteText fontSize={16} fontWeight={500}>
        {item.number} - {item.amount} $
      </WhiteText>
    ),
    [],
  );

  return (
    <BlackContentWrapper>
      <Center>
        <PieChart
          widthAndHeight={250}
          series={groupedSavedFromCards.map(({ amount }) => amount)}
          sliceColor={sliceColor}
        />
      </Center>

      <View mt={50} height={250}>
        <FlashList data={groupedSavedFromCards} estimatedItemSize={24} renderItem={renderItem} />
      </View>
    </BlackContentWrapper>
  );
};

export default SavingStatistic;
