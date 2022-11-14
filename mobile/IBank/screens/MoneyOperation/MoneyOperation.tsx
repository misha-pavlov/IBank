import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Center, Input, KeyboardAvoidingView, Text, useToast, View } from 'native-base';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
// svg
import { TransferIcon } from '../../assets/svg';
// styles
import { BlackContentWrapper, commonStyles, WhiteText } from '../../common/common.styles';
// components
import { IBankBlackButton } from '../../components';
// constants
import { colors } from '../../config/colors';
// helpers
import { getKeyboardVerticalOffset, isIOS } from '../../config/platform';
import { getFormattedAmount } from '../../helpers/generalHelpers';
// gql
import { GET_CARD_BY_ID, GET_USER_CARDS } from '../../gql/card.queries';
import { MONEY_SEND } from './MoneyOperation.mutations';
// hooks
import { useCurrentCard, useCurrentUser } from '../../hooks';
// types
import { NCardNavigatorRouteProp } from '../../navigation/types/CardNavigator.types';

const keyboardVerticalOffset = getKeyboardVerticalOffset();

const MoneyOperation = () => {
  const toast = useToast();
  const { user } = useCurrentUser();
  const inputRef = useRef<TextInput>();
  const { height } = useWindowDimensions();
  const { setOptions, goBack } = useNavigation();
  const { currentCard, updateCurrentCard } = useCurrentCard();
  const { params } = useRoute<NCardNavigatorRouteProp<'MoneyOperation'>>();
  const { from, isFromMagicCard, buttonText, to } = params;

  const [amount, setAmount] = useState(0);

  const [moneySendMutate] = useMutation(MONEY_SEND, {
    onError: err => console.error('MONEY_SEND = ', err),
  });

  useEffect(() => {
    setOptions({ headerTitle: params.headerTitle || '' });
  }, [params.headerTitle, setOptions]);

  const osPress = () => {
    inputRef.current && inputRef.current.focus();
  };

  const onCompleted = async () => {
    try {
      await updateCurrentCard();
    } catch (error) {
      console.error(error);
    }
    goBack();
  };

  const onSend = () => {
    moneySendMutate({
      variables: { to: to?._id, amount, ...(!isFromMagicCard && { from: from?._id }) },
      refetchQueries: [
        { query: GET_CARD_BY_ID, variables: { _id: currentCard._id } },
        { query: GET_USER_CARDS, variables: { owner: user?._id, excludeIds: [currentCard._id] } },
      ],
      awaitRefetchQueries: true,
      onCompleted,
    });
  };

  const onChangeText = useCallback(
    (number: string) => {
      setAmount(Number(number));

      if (from && amount > from?.amount) {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <View bg={colors.red} px="2" py="1" rounded="sm" mt={10}>
                <WhiteText>You entered too big amount</WhiteText>
              </View>
            );
          },
        });
      }
    },
    [amount, from, toast],
  );

  return (
    <BlackContentWrapper>
      {/* invisible input */}
      <View position="absolute" top={-50}>
        <Input autoFocus ref={inputRef} keyboardType="numeric" value={amount.toString()} onChangeText={onChangeText} />
      </View>

      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoiding}
        behavior={isIOS() ? 'position' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Center height={height - 200} justifyContent="space-between">
          <View mt="80%">
            <TouchableOpacity onPress={osPress}>
              <Text color={colors.gray600} textAlign="center">
                Amount {isFromMagicCard ? '∞' : getFormattedAmount(from?.amount || 0)} $
              </Text>

              <View mt="10px" flexDirection="row" alignItems="flex-end" justifyContent="center" position="relative">
                <WhiteText textAlign="center" fontSize={35} mr="10px">
                  {getFormattedAmount(amount)} $
                </WhiteText>
                <View position="absolute" right={0} bottom="20%">
                  <TransferIcon width={10} height={10} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View width="100%" mb={5}>
            <IBankBlackButton
              text={buttonText}
              onPress={onSend}
              isRed
              disabled={amount === 0 || (from && amount > from?.amount)}
            />
          </View>
        </Center>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default memo(MoneyOperation);