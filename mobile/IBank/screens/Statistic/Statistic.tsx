import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Flex, Text, View } from 'native-base';
import { isEqual } from 'lodash';
import { ActivityIndicator } from 'react-native';
import { GradientCententWrapper, SectionGradient, TransparentBox, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import CalendarPiker from './components/CalendarPiker/CalendarPiker';
import { CategoryIcon } from '../../assets/svg';
import { CardPicker, TransactionItem } from '../../components';
import { GetCardTransactionsByDates, TTransaction } from '../../types/transaction';
import { useCurrentCard } from '../../hooks';
import { TCard } from '../../types/card';

// TODO: fix bug with selectedDates after closing calendarPiker
const Statistic = () => {
  const isFirstRender = useRef(true);
  const { setOptions } = useNavigation();
  const { currentCard } = useCurrentCard();
  const [selectedCard, setSelectedCard] = useState<TCard>(currentCard);
  const [cardTransactionsByDates, setCardTransactionsByDates] = useState<GetCardTransactionsByDates | undefined>();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkBlue, shadowColor: colors.darkBlue } });
  }, [setOptions]);

  const renderItem = useCallback(
    ({ item }: { item: TTransaction }) => (
      <TransactionItem text={item.title} type={item.type} additionalText={item.type} amount={item.amount} />
    ),
    [],
  );

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListFooterComponent={() => (
        <GradientCententWrapper
          colors={[colors.darkBlue, colors.purple1, colors.purple1]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 0.7, y: 0.25 }}
          locations={[1, 0.5, 0]}>
          <WhiteText fontSize={20} fontWeight={600}>
            Statistic
          </WhiteText>

          <CalendarPiker
            isFirstRender={isFirstRender}
            selectedCard={selectedCard}
            cardTransactionsByDates={cardTransactionsByDates}
            setCardTransactionsByDates={setCardTransactionsByDates}
          />
          <CardPicker selectedCard={selectedCard} setSelectedCard={setSelectedCard} />

          {/* Categories */}
          <View mt={25}>
            <SectionGradient
              colors={[colors.blueYellow1, colors.blueYellow2, colors.blueYellow3]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 0.7, y: 0.25 }}
              locations={[1, 0.5, 0]}>
              <WhiteText fontSize={16}>Total</WhiteText>
              <WhiteText fontSize={25} fontWeight={600}>
                {cardTransactionsByDates?.total} $
              </WhiteText>

              <Flex alignItems="flex-start" mt="15px">
                <TransparentBox w="50%">
                  <CategoryIcon />
                  <WhiteText fontSize={22} fontWeight={600}>
                    {cardTransactionsByDates?.categoriesCount}
                  </WhiteText>
                  <Text color={colors.gray400}>Categories</Text>
                </TransparentBox>
              </Flex>
            </SectionGradient>
          </View>

          {/* Transactions */}
          <WhiteText fontSize={16} fontWeight={600} mt={25} mb={15}>
            Transactions list
          </WhiteText>

          {cardTransactionsByDates?.data ? (
            <FlatList
              listKey="transaction_key"
              keyExtractor={(item, index) => `_key${item._id}${index.toString()}`}
              data={cardTransactionsByDates?.data}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <View>
                  <WhiteText textAlign="center">No transactions</WhiteText>
                </View>
              )}
            />
          ) : (
            <ActivityIndicator />
          )}
        </GradientCententWrapper>
      )}
    />
  );
};

export default memo(Statistic, isEqual);
