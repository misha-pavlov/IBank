import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { ArrowDownIcon, ArrowUpIcon, HStack, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { appEnum } from '../../config/screens';
import { UPDATE_CARD } from '../../gql/card.mutations';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { useCurrentCard } from '../../hooks';
import { NCreditsNavigatorNavigationProp } from '../../navigation/types/CreditsNavigator.types';

const CreditSettings = () => {
  const { setOptions, navigate } = useNavigation<NCreditsNavigatorNavigationProp<'MoneyOperation'>>();
  const { currentCard } = useCurrentCard();
  const { creditLimit, _id } = currentCard;

  useEffect(() => {
    setOptions({
      headerTitle: 'Limits settings',
    });
  }, [setOptions]);

  const [updateCardMutate] = useMutation(UPDATE_CARD, {
    onError: err => console.error('UPDATE_CARD = ', err),
  });

  const onPress = (isIncreaseLimit = false) => {
    navigate(appEnum.MoneyOperation, {
      buttonText: 'Update',
      onUpdate: updateCardMutate,
      startValue: creditLimit,
      ...(!isIncreaseLimit && { maxAmount: creditLimit }),
      getVariables: newValue => ({ cardId: _id, newCreditLimit: newValue }),
    });
  };

  return (
    <BlackContentWrapper>
      <Text color={colors.blueGray500}>Card (current limit: {getFormattedAmount(creditLimit)} $)</Text>

      <VStack space={6} mt="20px">
        <TouchableOpacity onPress={() => onPress(true)}>
          <HStack space={4} alignItems="center">
            <View backgroundColor={colors.green1} p="6px" borderRadius={50}>
              <ArrowUpIcon color={colors.gray100} />
            </View>
            <WhiteText>Increase limit</WhiteText>
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPress()}>
          <HStack space={4} alignItems="center">
            <View backgroundColor={colors.red} p="6px" borderRadius={50}>
              <ArrowDownIcon color={colors.gray100} />
            </View>
            <WhiteText>Dicrease limit</WhiteText>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </BlackContentWrapper>
  );
};

export default CreditSettings;
