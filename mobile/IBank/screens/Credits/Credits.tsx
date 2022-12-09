import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { CreditIcon, Settings } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { appEnum, creditsEnum } from '../../config/screens';
import { UPDATE_CARD } from '../../gql/card.mutations';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { useCurrentCard } from '../../hooks';
import { NCreditsNavigatorNavigationProp } from '../../navigation/types/CreditsNavigator.types';
import Plate from './components/Plate/Plate';

export const Credits = () => {
  const { setOptions, navigate } =
    useNavigation<NCreditsNavigatorNavigationProp<'CreditSettings' | 'MoneyOperation'>>();
  const { currentCard } = useCurrentCard();
  const { _id, payByPartsLimit } = currentCard;

  useEffect(() => {
    setOptions({
      headerTitle: 'Your limit',
      headerStyle: { backgroundColor: colors.green2, shadowColor: colors.green2 },
      headerLeft: () => (
        <View ml="16px">
          <TouchableOpacity onPress={() => navigate(creditsEnum.CreditSettings)}>
            <Settings />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigate, setOptions]);

  const [updateCardMutate] = useMutation(UPDATE_CARD, {
    onError: err => console.error('UPDATE_CARD = ', err),
  });

  const onPress = () => {
    navigate(appEnum.MoneyOperation, {
      buttonText: 'Update',
      onUpdate: updateCardMutate,
      startValue: payByPartsLimit,
      getVariables: newValue => ({ cardId: _id, newPayByPartsLimit: newValue }),
    });
  };

  return (
    <BlackContentWrapper withoutPadding position="relative">
      <View backgroundColor={colors.green2} pb={50}>
        <WhiteText textAlign="center" fontSize={40}>
          {getFormattedAmount(payByPartsLimit)} $
        </WhiteText>
      </View>

      <VStack position="absolute" top="15%" ml="16px" space={4}>
        <Plate icon={<CreditIcon />} text="Pay by parts" iconBackgroundColor={colors.green2} onPress={onPress} />
      </VStack>
    </BlackContentWrapper>
  );
};

export default Credits;
