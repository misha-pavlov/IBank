import { useNavigation } from '@react-navigation/native';
import { View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ArchiveIcon, CreditIcon, Settings } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { creditsEnum } from '../../config/screens';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { NCreditsNavigatorNavigationProp } from '../../navigation/types/CreditsNavigator.types';
import Plate from './components/Plate/Plate';

export const Credits = () => {
  const { setOptions, navigate } = useNavigation<NCreditsNavigatorNavigationProp<'CreditSettings'>>();

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

  return (
    <BlackContentWrapper withoutPadding position="relative">
      <View backgroundColor={colors.green2} pb={20}>
        <WhiteText textAlign="center" fontSize={40}>
          {getFormattedAmount(123.2)} $
        </WhiteText>
      </View>

      <VStack position="absolute" top="15%" ml="16px" space={4}>
        <Plate icon={<CreditIcon />} text="Pay by parts" iconBackgroundColor={colors.green2} />
        <Plate icon={<ArchiveIcon />} text="Archive" iconBackgroundColor={colors.blueGray500} />
      </VStack>
    </BlackContentWrapper>
  );
};

export default Credits;
