import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Center, CloseIcon, Fade, Flex, HStack, Input, SearchIcon, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import moment from 'moment';
// svg
import { AnotherActionsIcon, SendOnCardIcon, TopUpIcon } from '../../../../assets/svg';
// styles
import { commonStyles, SectionGradient, WhiteText } from '../../../../common/common.styles';
// components
import { RoundTouchable, TransactionItem } from '../../../../components';
import HeaderDoubleCards from '../../components/HeaderDoubleCards/HeaderDoubleCards';
import MoveToCard from './components/MoveToCard/MoveToCard';
// constants
import { colors } from '../../../../config/colors';
import { cardEnum } from '../../../../config/screens';
// helpers
import { dateToFromNowDaily, getFormattedAmount } from '../../../../helpers/generalHelpers';
// types
import { NCardNavigatorNavigationProp } from '../../../../navigation/types/CardNavigator.types';
import { TCard } from '../../../../types/card';
import { TTransaction } from '../../../../types/transaction';
// gql
import { GET_CARD_TRANSACTIONS } from './Amount.queries';
// hooks
import { useDebounced } from '../../../../hooks';

type TAmount = {
  currentCard: TCard;
  renderPaginaton: JSX.Element;
  moveToNextScreen: () => void;
};

const Amount: FC<TAmount> = ({ renderPaginaton, moveToNextScreen, currentCard }) => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounced(searchTerm);

  const { navigate } = useNavigation<NCardNavigatorNavigationProp<'TopUp' | 'SendOnCard' | 'OtherPayments'>>();
  const { data, loading } = useQuery(GET_CARD_TRANSACTIONS, {
    variables: { cardId: currentCard._id, searchTerm: debounced },
  });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['52%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <View>
        <WhiteText textAlign="center" fontWeight={600} fontSize={16} mb="24px">
          {dateToFromNowDaily(moment(section.title))}
        </WhiteText>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: TTransaction }) => (
      <TransactionItem text={item.title} type={item.type} additionalText={item.type} amount={item.amount} />
    ),
    [],
  );

  const renderAmountHeader = useMemo(() => {
    if (bottomSheetIndex === 1) {
      return (
        <View position="absolute" right={0} left={0} top="60px" zIndex={150} w="100%">
          <Fade in>
            <WhiteText fontWeight={600} textAlign="center" fontSize={24}>
              {currentCard.isBlocked ? 'Your card is blocked!' : `${getFormattedAmount(currentCard.amount)} $`}
            </WhiteText>
          </Fade>
        </View>
      );
    }

    return <HeaderDoubleCards />;
  }, [bottomSheetIndex, currentCard.amount, currentCard.isBlocked]);

  const setSearchMode = useCallback(() => setIsSearchMode(!isSearchMode), [isSearchMode]);

  const renderSearchIcon = useMemo(
    () => (isSearchMode ? <CloseIcon color={colors.gray100} /> : <SearchIcon color={colors.gray100} />),
    [isSearchMode],
  );

  const onChangeText = useCallback((text: string) => setSearchTerm(text), []);

  const renderSearchInput = useMemo(() => {
    if (isSearchMode) {
      return (
        <Input
          w="85%"
          variant="filled"
          value={searchTerm}
          placeholder="Search"
          color={colors.gray100}
          onChangeText={onChangeText}
          borderColor={colors.black1}
          backgroundColor={colors.black1}
          placeholderTextColor={colors.gray100_opacity45}
          InputLeftElement={<SearchIcon color={colors.gray100_opacity45} ml="8px" />}
        />
      );
    }

    return <View />;
  }, [isSearchMode, onChangeText, searchTerm]);

  const renderListHeader = useMemo(() => {
    return (
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" px="16px" pb="8px">
        {renderSearchInput}

        <TouchableOpacity onPress={setSearchMode}>
          <View borderRadius={50} p="8px" backgroundColor={colors.black1}>
            {renderSearchIcon}
          </View>
        </TouchableOpacity>
      </Flex>
    );
  }, [renderSearchIcon, renderSearchInput, setSearchMode]);

  const renderBottomSheet = useMemo(() => {
    return (
      <BottomSheet
        index={bottomSheetIndex}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={commonStyles.blackBackground}
        handleIndicatorStyle={commonStyles.blackBackground}>
        {renderListHeader}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <BottomSheetSectionList
            sections={data?.getCardTransactions}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={commonStyles.container16}
            ListEmptyComponent={() => (
              <View>
                <WhiteText textAlign="center">No transactions</WhiteText>
              </View>
            )}
          />
        )}
      </BottomSheet>
    );
  }, [
    loading,
    renderItem,
    snapPoints,
    renderListHeader,
    bottomSheetIndex,
    handleSheetChanges,
    renderSectionHeader,
    data?.getCardTransactions,
  ]);

  return (
    <View flex={1}>
      {renderAmountHeader}
      <SectionGradient
        colors={[colors.whiteRed, colors.whiteBlue, colors.whiteBlue1]}
        start={{ x: 0.0, y: 0.7 }}
        end={{ x: 0.9, y: 0.5 }}
        locations={[1, 0.5, 0]}
        withoutBorderRadius>
        <View mt="100px" mb="100px">
          <View flexDirection="row" justifyContent="space-between">
            <WhiteText fontSize={currentCard.isBlocked ? 24 : 40} fontWeight={600} ml={34}>
              {currentCard.isBlocked ? 'Your card is blocked!' : `${getFormattedAmount(currentCard.amount)} $`}
            </WhiteText>

            <MoveToCard moveToNextScreen={moveToNextScreen} />
          </View>

          <View>
            <Center mb="-15px" mt="10%">
              {renderPaginaton}
            </Center>
            <HStack justifyContent="space-between" mx={34}>
              <RoundTouchable text="Top up your card" icon={<TopUpIcon />} onPress={() => navigate(cardEnum.TopUp)} />
              <RoundTouchable
                text="Send on card"
                icon={<SendOnCardIcon />}
                onPress={() => navigate(cardEnum.SendOnCard)}
              />
              <RoundTouchable
                text="Another payments"
                icon={<AnotherActionsIcon />}
                onPress={() => navigate(cardEnum.OtherPayments)}
              />
            </HStack>
          </View>
        </View>
      </SectionGradient>
      {renderBottomSheet}
    </View>
  );
};

export default memo(Amount);
