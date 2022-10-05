import { Text } from 'native-base';
import React, { FC } from 'react';
import { colors } from '../../config/colors';
import { BlackButtonTouchable } from './IBankBlackButton.styles';

type TIBankBlackButton = {
  text: string;
  onPress: () => void;
};

const IBankBlackButton: FC<TIBankBlackButton> = ({ text, onPress }) => {
  return (
    <BlackButtonTouchable onPress={onPress}>
      <Text color={colors.red} fontWeight={600} fontSize="16px" textAlign="center">
        {text}
      </Text>
    </BlackButtonTouchable>
  );
};

export default IBankBlackButton;
