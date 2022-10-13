import { View } from 'native-base';
import React from 'react';
import { SectionGradient, WhiteText } from '../../../../common/common.styles';
import { colors } from '../../../../config/colors';
import HeaderDoubleCards from '../../components/HeaderDoubleCards/HeaderDoubleCards';

const Amount = () => {
  return (
    <View flex={1}>
      <HeaderDoubleCards />
      <SectionGradient
        colors={[colors.whiteRed, colors.whiteBlue, colors.whiteBlue1]}
        start={{ x: 0.0, y: 0.7 }}
        end={{ x: 0.9, y: 0.5 }}
        locations={[1, 0.5, 0]}
        withoutBorderRadius>
        <View height="50%">
          <View mt="100px">
            <WhiteText>Amount</WhiteText>
          </View>
        </View>
      </SectionGradient>
    </View>
  );
};

export default Amount;
