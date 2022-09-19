import React, { FC } from 'react';
import { WhiteText } from '../../../../../../common/common.styles';
import { RoundTouchable } from './RoundButton.styles';

type TRoundButton = {
  text: number;
  isEmptyButton?: boolean;
  onPress: () => void;
};

const RoundButton: FC<TRoundButton> = ({ text, isEmptyButton, onPress }) => {
  return (
    <RoundTouchable
      onPress={onPress}
      isEmptyButton={isEmptyButton}
      disabled={isEmptyButton}>
      <WhiteText fontSize={16}>{!isEmptyButton ? text : ''}</WhiteText>
    </RoundTouchable>
  );
};

export default RoundButton;
