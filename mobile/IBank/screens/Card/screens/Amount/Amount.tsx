import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { Center, CloseIcon, Fade, Flex, HStack, Input, SearchIcon, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AnotherActionsIcon, SendOnCardIcon, TopUpIcon } from '../../../../assets/svg';
import { commonStyles, SectionGradient, WhiteText } from '../../../../common/common.styles';
import { RoundTouchable, TransactionItem } from '../../../../components';
import { colors } from '../../../../config/colors';
import { getFormattedAmount } from '../../../../helpers/transactionHelpers';
import { useCurrentCard } from '../../../../hooks';
import HeaderDoubleCards from '../../components/HeaderDoubleCards/HeaderDoubleCards';
import MoveToCard from './components/MoveToCard/MoveToCard';

type TAmount = {
  renderPaginaton: JSX.Element;
  moveToNextScreen: () => void;
};

const Amount: FC<TAmount> = ({ renderPaginaton, moveToNextScreen }) => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { currentCard } = useCurrentCard();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['52%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  // variables
  const sections = useMemo(
    () =>
      Array(3)
        .fill(0)
        .map((_, index) => ({
          title: `Section ${index}`,
          data: Array(10)
            .fill(0)
            .map(({}, indexMap) => `Item ${indexMap}`),
        })),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <View>
        <WhiteText textAlign="center" fontWeight={600} fontSize={16} mb="24px">
          {section.title}
        </WhiteText>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(() => <TransactionItem type="play" additionalText="Books" amount={120} />, []);

  const renderAmountHeader = useMemo(() => {
    if (bottomSheetIndex === 1) {
      return (
        <View position="absolute" right={0} left={0} top="60px" zIndex={150} w="100%">
          <Fade in>
            <WhiteText fontWeight={600} textAlign="center" fontSize={24}>
              {getFormattedAmount(currentCard.amount)} $
            </WhiteText>
          </Fade>
        </View>
      );
    }

    return <HeaderDoubleCards />;
  }, [bottomSheetIndex, currentCard.amount]);

  const setSearchMode = useCallback(() => setIsSearchMode(!isSearchMode), [isSearchMode]);

  const renderSearchIcon = useMemo(
    () => (isSearchMode ? <CloseIcon color={colors.gray100} /> : <SearchIcon color={colors.gray100} />),
    [isSearchMode],
  );

  const onChangeText = useCallback((text: string) => setSearchText(text), []);

  const renderSearchInput = useMemo(() => {
    if (isSearchMode) {
      return (
        <Input
          w="85%"
          variant="filled"
          value={searchText}
          placeholder="Search"
          onChangeText={onChangeText}
          borderColor={colors.black1}
          backgroundColor={colors.black1}
          placeholderTextColor={colors.gray100_opacity45}
          InputLeftElement={<SearchIcon color={colors.gray100_opacity45} ml="8px" />}
        />
      );
    }

    return <View />;
  }, [isSearchMode, onChangeText, searchText]);

  const renderListHeader = useMemo(() => {
    return (
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" px="16px">
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
        <BottomSheetSectionList
          sections={sections}
          keyExtractor={i => i}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={commonStyles.container16}
        />
      </BottomSheet>
    );
  }, [bottomSheetIndex, handleSheetChanges, renderItem, renderListHeader, renderSectionHeader, sections, snapPoints]);

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
            <WhiteText fontSize={40} fontWeight={600} ml={34}>
              {getFormattedAmount(currentCard.amount)} $
            </WhiteText>

            <MoveToCard moveToNextScreen={moveToNextScreen} />
          </View>

          <View>
            <Center mb="-15px" mt="10%">
              {renderPaginaton}
            </Center>
            <HStack justifyContent="space-between" mx={34}>
              <RoundTouchable text="Top up your card" icon={<TopUpIcon />} onPress={() => console.log('123gg')} />
              <RoundTouchable text="Send on card" icon={<SendOnCardIcon />} onPress={() => console.log('123gg')} />
              <RoundTouchable
                text="Another actions"
                icon={<AnotherActionsIcon />}
                onPress={() => console.log('123gg')}
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
