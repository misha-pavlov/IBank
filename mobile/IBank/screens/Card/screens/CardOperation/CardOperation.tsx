import { Center, View } from 'native-base';
import React, { FC } from 'react';
import { WhiteText } from '../../../../common/common.styles';
import { colors } from '../../../../config/colors';

type TCardOperation = {
  renderPaginaton: JSX.Element;
};

const CardOperation: FC<TCardOperation> = ({ renderPaginaton }) => {
  return (
    <View borderWidth={1} borderColor={colors.gray100} flex={1}>
      <WhiteText>CardOperation</WhiteText>
      <Center>{renderPaginaton}</Center>
    </View>
  );
};

export default CardOperation;
