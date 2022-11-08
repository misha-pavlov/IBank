import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Center, Flex, Progress, Text, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { CalendarIcon } from '../../../../assets/svg';
import { commonStyles, SectionGradient, WhiteText } from '../../../../common/common.styles';
import { Card, RoundTouchable, TransactionItem } from '../../../../components';
import { colors } from '../../../../config/colors';
import { getFormattedAmount } from '../../../../helpers/generalHelpers';
import { useCurrentCard } from '../../../../hooks';
import { cardSettings } from './constants';
import { TCardSettings } from './types';

type TCardOperation = {
  renderPaginaton: JSX.Element;
};

const CardOperations: FC<TCardOperation> = ({ renderPaginaton }) => {
  const { currentCard } = useCurrentCard();
  const { type, number, expired, isMasterCard, internetLimit, usedInternetLimit } = currentCard;
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['45%', '85%'], []);

  const renderItem = useCallback(
    ({ item }: { item: TCardSettings }) => (
      <TouchableOpacity>
        <TransactionItem icon={item.icon} text={item.text} hideAmount />
      </TouchableOpacity>
    ),
    [],
  );

  const renderBottomSheet = useMemo(() => {
    return (
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={commonStyles.blackBackground}
        handleIndicatorStyle={commonStyles.blackBackground}>
        <Text color={colors.gray100_opacity45} ml="16px" mb="24px">
          Card settings
        </Text>

        <BottomSheetFlatList
          data={cardSettings}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          contentContainerStyle={commonStyles.container16}
        />
      </BottomSheet>
    );
  }, [renderItem, snapPoints]);

  return (
    <View flex={1}>
      <SectionGradient
        colors={[colors.orange1, colors.orange2, colors.orange3]}
        start={{ x: 0.0, y: 0.7 }}
        end={{ x: 0.9, y: 0.5 }}
        locations={[1, 0.5, 0]}
        withoutBorderRadius>
        <View mt="45px">
          <Card withFullWidth type={type} cardNumber={number} expiredDate={expired} isMasterCard={isMasterCard} />
        </View>
        <Center>{renderPaginaton}</Center>

        <Flex flexDirection="row" alignItems="center" mb="50px">
          <RoundTouchable icon={<CalendarIcon width={25} height={25} />} disabled />

          <View ml="24px" w="80%">
            <WhiteText mb="5px">Internet operations limit</WhiteText>
            <Progress
              value={((internetLimit - usedInternetLimit) * 100) / internetLimit}
              w="100%"
              bg={colors.black1}
              _filledTrack={{
                bg: colors.lightGreenA400,
              }}
            />
            <WhiteText mt="5px">
              Left {getFormattedAmount(internetLimit - usedInternetLimit)} $ of {getFormattedAmount(internetLimit)} $
            </WhiteText>
          </View>
        </Flex>
      </SectionGradient>
      {renderBottomSheet}
    </View>
  );
};

export default memo(CardOperations);
