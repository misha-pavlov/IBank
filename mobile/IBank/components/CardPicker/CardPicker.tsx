import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, Flex, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BlackCard } from '../../common/cards';
import { colors } from '../../config/colors';
import { commonStyles, WhiteText } from '../../common/common.styles';
import { s } from './CardPicker.styles';
import CardListtem from '../CardListtem/CardListtem';

const CardPicker = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '35%', '60%'], []);

  const onPress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
        <View p="12px" borderRadius={12} backgroundColor={colors.transparent}>
          <Flex flexDirection="row" alignItems="center">
            <View backgroundColor={colors.gray400} p="5px" borderRadius={50} mr="10px">
              <BlackCard />
            </View>

            <View>
              <WhiteText fontWeight={600}>Card type</WhiteText>
              <Text color={colors.blueGray200} fontSize={12}>
                Card amount
              </Text>
            </View>
          </Flex>
        </View>
      </TouchableOpacity>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={s.bottomSheet}
        handleIndicatorStyle={commonStyles.gray100Backround}>
        <View p="16px">
          <FlatList
            data={[{ test_id: 1 }, { test_id: 2 }]}
            renderItem={() => <CardListtem card={<BlackCard />} type="Custom type" amount={123} onPress={onPress} />}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default CardPicker;
