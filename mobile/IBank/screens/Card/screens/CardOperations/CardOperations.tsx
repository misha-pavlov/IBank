import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Center, Flex, Progress, Text, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
// svg
import { CalendarIcon } from '../../../../assets/svg';
// styles
import { commonStyles, SectionGradient, WhiteText } from '../../../../common/common.styles';
// components
import { Card, RoundTouchable, TransactionItem } from '../../../../components';
// constants
import { colors } from '../../../../config/colors';
import { cardSettings } from './constants';
import { appEnum } from '../../../../config/screens';
// helpers
import { getFormattedAmount } from '../../../../helpers/generalHelpers';
// types
import { TCard } from '../../../../types/card';
import { TCardSettings } from './types';
import { NCardNavigatorNavigationProp } from '../../../../navigation/types/CardNavigator.types';
// gql
import { UPDATE_INTERNET_LIMIT } from './CardOperations.mutations';

type TCardOperation = {
  renderPaginaton: JSX.Element;
  currentCard: TCard;
};

const CardOperations: FC<TCardOperation> = ({ renderPaginaton, currentCard }) => {
  const { type, number, expired, isMasterCard, internetLimit, usedInternetLimit, cvv } = currentCard;
  const { navigate } = useNavigation<NCardNavigatorNavigationProp<'MoneyOperation'>>();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['45%', '85%'], []);

  const [updateInternetLimitMutate] = useMutation(UPDATE_INTERNET_LIMIT, {
    onError: err => console.error('UPDATE_INTERNET_LIMIT = ', err),
  });

  const renderItem = useCallback(
    ({ item }: { item: TCardSettings }) => (
      <TouchableOpacity>
        <TransactionItem icon={item.icon} text={item.text} />
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
          <Card
            cvv={cvv}
            type={type}
            withFullWidth
            cardNumber={number}
            expiredDate={expired}
            isMasterCard={isMasterCard}
            onLongPress={() => Clipboard.setString(number)}
          />
        </View>
        <Center>{renderPaginaton}</Center>

        <Flex flexDirection="row" alignItems="center" mb="50px">
          <RoundTouchable
            icon={<CalendarIcon width={25} height={25} />}
            onPress={() =>
              navigate(appEnum.MoneyOperation, {
                buttonText: 'Update',
                onUpdate: updateInternetLimitMutate,
                startValue: currentCard.internetLimit,
                getVariables: newValue => ({ cardId: currentCard._id, newInternetLimit: newValue }),
              })
            }
          />

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
