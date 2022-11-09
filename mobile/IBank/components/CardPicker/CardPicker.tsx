import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Flex, Text, View } from 'native-base';
import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useQuery } from '@apollo/client';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { colors } from '../../config/colors';
import { commonStyles, WhiteText } from '../../common/common.styles';
import { useCurrentCard, useCurrentUser } from '../../hooks';
import { getCardByType } from '../../helpers/cardHelpers';
import { GET_USER_CARDS } from '../../gql/card.queries';
import { TCard } from '../../types/card';
import CardListItem from '../CardListItem/CardListItem';

const CardPicker = () => {
  const { height } = useWindowDimensions();
  const { currentCard } = useCurrentCard();
  const { user } = useCurrentUser();

  const [card, setCard] = useState(currentCard);

  const { data, loading } = useQuery(GET_USER_CARDS, { variables: { owner: user?._id } });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '85%', '90%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} opacity={0} />
    ),
    [],
  );

  const onPress = useCallback((newCard: TCard) => {
    setCard(newCard);
    bottomSheetRef.current?.close();
  }, []);

  const containerStyle = { marginLeft: -16, marginRight: -16, height };

  const renderItem = useCallback(
    ({ item }: { item: TCard }) => {
      return (
        <CardListItem
          type={item.type}
          amount={item.amount}
          card={getCardByType(item.type)}
          onPress={() => onPress(item)}
        />
      );
    },
    [onPress],
  );

  return (
    <View zIndex={100}>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
        <View p="12px" borderRadius={12} backgroundColor={colors.transparent}>
          <Flex flexDirection="row" alignItems="center">
            <View backgroundColor={colors.green1} p="5px" borderRadius={50} mr="10px">
              {getCardByType(card.type)}
            </View>

            <View>
              <WhiteText fontWeight={600}>{card.type}</WhiteText>
              <Text color={colors.blueGray200} fontSize={12}>
                {card.amount}
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
        backgroundStyle={commonStyles.blackBackground}
        backdropComponent={renderBackdrop}
        containerStyle={containerStyle}
        handleIndicatorStyle={commonStyles.gray100Backround}>
        <View p="16px">
          {loading ? <ActivityIndicator /> : <FlatList data={data?.getUserCards} renderItem={renderItem} />}
        </View>
      </BottomSheet>
    </View>
  );
};

export default memo(CardPicker);
