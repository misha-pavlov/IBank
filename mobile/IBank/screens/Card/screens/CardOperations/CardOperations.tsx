import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Center, Flex, Progress, Text, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { isEqual } from 'lodash';
// svg
import { BlockedCardIcon, CalendarIcon } from '../../../../assets/svg';
// styles
import { commonStyles, SectionGradient, WhiteText } from '../../../../common/common.styles';
// components
import { Card, RoundTouchable, TransactionItem } from '../../../../components';
import CardOperationsModal from './components/CardOperationsModal/CardOperationsModal';
// constants
import { colors } from '../../../../config/colors';
import { cardSettings } from './constants';
import { appEnum } from '../../../../config/screens';
// helpers
import { getFormattedAmount } from '../../../../helpers/generalHelpers';
// types
import { CardType, TCard } from '../../../../types/card';
import { TCardSettings } from './types';
import { NCardNavigatorNavigationProp } from '../../../../navigation/types/CardNavigator.types';
// gql
import { UPDATE_CARD } from './CardOperations.mutations';
import moment from 'moment';

type TCardOperation = {
  renderPaginaton: JSX.Element;
  currentCard: TCard;
  updateCurrentCard: () => Promise<void>;
};

const CardOperations: FC<TCardOperation> = ({ renderPaginaton, currentCard, updateCurrentCard }) => {
  const { _id, isBlocked, type, number, expired, isMasterCard, internetLimit, usedInternetLimit, cvv } = currentCard;
  const { navigate } = useNavigation<NCardNavigatorNavigationProp<'MoneyOperation'>>();
  const [showModal, setShowModal] = useState<string | undefined>();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['45%', '85%'], []);

  const [updateCardMutate] = useMutation(UPDATE_CARD, {
    onError: err => console.error('UPDATE_CARD = ', err),
  });

  const onPress = useCallback(
    (id: string) => {
      switch (id) {
        case '1':
        case '3':
          return setShowModal(id);

        case '2':
          return Alert.alert(
            isBlocked ? 'Do you want to unblock this card?' : 'Do you want to block this card?',
            isBlocked ? '' : 'You can unblock card in any time',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () =>
                  updateCardMutate({
                    variables: { cardId: _id, newIsBlocked: !isBlocked },
                    onCompleted: () => updateCurrentCard(),
                  }),
                style: isBlocked ? 'default' : 'destructive',
              },
            ],
          );

        case '4':
          return Alert.alert('Do you want to republish this card?', '', [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              onPress: () =>
                updateCardMutate({
                  variables: { cardId: _id, newExpired: moment(expired).add(1, 'years').toDate() },
                  onCompleted: () => updateCurrentCard(),
                }),
            },
          ]);

        default:
          return null;
      }
    },
    [_id, expired, isBlocked, updateCardMutate, updateCurrentCard],
  );

  const onSubmit = useCallback(
    (id: string, newType: CardType, newPin: string) => {
      switch (id) {
        case '1':
          return updateCardMutate({ variables: { cardId: _id, newType } });

        case '3':
          return updateCardMutate({ variables: { cardId: _id, newPin } });

        default:
          return null;
      }
    },
    [_id, updateCardMutate],
  );

  const renderItem = useCallback(
    ({ item }: { item: TCardSettings }) => (
      <TouchableOpacity>
        <TransactionItem icon={item.icon} text={item.text} onPress={() => onPress(item.id)} />
      </TouchableOpacity>
    ),
    [onPress],
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
          {isBlocked ? (
            <Center>
              <BlockedCardIcon width={220} height={220} fill={colors.black} />
            </Center>
          ) : (
            <Card
              cvv={cvv}
              type={type}
              withFullWidth
              cardNumber={number}
              expiredDate={expired}
              isMasterCard={isMasterCard}
              onLongPress={() => Clipboard.setString(number)}
            />
          )}
        </View>
        <Center>{renderPaginaton}</Center>

        <Flex flexDirection="row" alignItems="center" mb="50px">
          <RoundTouchable
            icon={<CalendarIcon width={25} height={25} />}
            onPress={() =>
              navigate(appEnum.MoneyOperation, {
                buttonText: 'Update',
                onUpdate: updateCardMutate,
                startValue: internetLimit,
                getVariables: newValue => ({ cardId: _id, newInternetLimit: newValue }),
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

      <CardOperationsModal
        type={type}
        onSubmit={onSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
        updateCurrentCard={updateCurrentCard}
      />
    </View>
  );
};

export default memo(CardOperations, isEqual);
