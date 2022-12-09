import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useEffect } from 'react';
import { TopUpIconV2 } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { IBankButtonWithIcon } from '../../components';
import { colors } from '../../config/colors';
import { getFormattedAmount } from '../../helpers/generalHelpers';

const Cashback = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      headerTitle: 'Your cashback',
      headerStyle: { backgroundColor: colors.green3, shadowColor: colors.green3 },
    });
  }, [setOptions]);

  return (
    <BlackContentWrapper withoutPadding>
      <View backgroundColor={colors.green3} pb={50}>
        <WhiteText textAlign="center" fontSize={40}>
          {getFormattedAmount(123)} $
        </WhiteText>

        <View position="absolute" bottom={-20} w="100%" pl="16px" pr="16px">
          <IBankButtonWithIcon
            text="Get cashback"
            icon={<TopUpIconV2 />}
            backgroundColor={colors.pink}
            onPress={() => console.log('123')}
          />
        </View>
      </View>
    </BlackContentWrapper>
  );
};

export default Cashback;
