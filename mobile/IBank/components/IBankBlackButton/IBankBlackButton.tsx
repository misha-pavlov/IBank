import { Text } from 'native-base';
import React, { FC } from 'react';
import { colors } from '../../config/colors';
import { BlackButtonTouchable } from './IBankBlackButton.styles';

type TIBankBlackButton = {
  text: string;
  isRed?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const IBankBlackButton: FC<TIBankBlackButton> = ({ text, isRed, disabled, onPress }) => {
  return (
    <BlackButtonTouchable onPress={onPress} disabled={disabled} isRed={isRed}>
      <Text color={isRed ? colors.gray900 : colors.red} fontWeight={600} fontSize="16px" textAlign="center">
        {text}
      </Text>
    </BlackButtonTouchable>
  );
};

export default IBankBlackButton;
