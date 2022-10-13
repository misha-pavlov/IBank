import { View } from 'native-base';
import React from 'react';
import { WhiteText } from '../../../../common/common.styles';
import { colors } from '../../../../config/colors';

const CardOperation = () => {
  return (
    <View borderWidth={1} borderColor={colors.gray100} flex={1}>
      <WhiteText>CardOperation</WhiteText>
    </View>
  );
};

export default CardOperation;
