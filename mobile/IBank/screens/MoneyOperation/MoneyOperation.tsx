import { useNavigation, useRoute } from '@react-navigation/native';
import { Center, Input, KeyboardAvoidingView, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TransferIcon } from '../../assets/svg';
import { BlackContentWrapper, commonStyles, WhiteText } from '../../common/common.styles';
import { IBankBlackButton } from '../../components';
import { colors } from '../../config/colors';
import { getKeyboardVerticalOffset, isIOS } from '../../config/platform';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { NCardNavigatorRouteProp } from '../../navigation/types/CardNavigator.types';

const keyboardVerticalOffset = getKeyboardVerticalOffset();

const MoneyOperation = () => {
  const inputRef = useRef<TextInput>();
  const { setOptions } = useNavigation();
  const { height } = useWindowDimensions();
  const { params } = useRoute<NCardNavigatorRouteProp<'MoneyOperation'>>();
  const { from, isFromMagicCard, buttonText } = params;

  const [amount, setAmount] = useState(0);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    setOptions({ headerTitle: params.headerTitle || '' });
  }, [params.headerTitle, setOptions]);

  const osPress = () => {
    inputRef.current && inputRef.current.focus();
    setIsKeyboardShown(true);
  };

  return (
    <BlackContentWrapper>
      {/* invisible input */}
      <View position="absolute" top={-50}>
        <Input
          ref={inputRef}
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={number => setAmount(Number(number))}
        />
      </View>

      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoiding}
        behavior={isIOS() ? 'position' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Center height={height - 200} justifyContent="space-between">
          <View mt={isKeyboardShown ? '80%' : '30%'}>
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
            <IBankBlackButton text={buttonText} onPress={() => console.log('123')} isRed disabled={amount === 0} />
          </View>
        </Center>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default MoneyOperation;
