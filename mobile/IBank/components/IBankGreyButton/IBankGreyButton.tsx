import React, { FC } from 'react';
import { WhiteText } from '../../common/common.styles';
import { IBankGreyButtonTouchable } from './IBankGreyButton.styles';

type TIBankGreyButton = {
  text: string;
  onPress: () => void;
  w?: number;
};

const IBankGrayButton: FC<TIBankGreyButton> = ({ text, onPress, w = 50 }) => {
  return (
    <IBankGreyButtonTouchable onPress={onPress} w={w}>
      <WhiteText>{text}</WhiteText>
    </IBankGreyButtonTouchable>
  );
};

export default IBankGrayButton;
