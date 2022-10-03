import React, { FC } from 'react';
import { WhiteText } from '../../common/common.styles';
import { IBankGrayButtonTouchable } from './IBankGrayButton.styles';

type TIBankGrayButton = {
  text: string;
  onPress: () => void;
  w?: number;
};

const IBankGrayButton: FC<TIBankGrayButton> = ({ text, onPress, w = 50 }) => {
  return (
    <IBankGrayButtonTouchable onPress={onPress} w={w}>
      <WhiteText>{text}</WhiteText>
    </IBankGrayButtonTouchable>
  );
};

export default IBankGrayButton;
