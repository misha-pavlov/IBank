import React, { FC, useMemo } from 'react';
import Backspace from '../../../../../../assets/svg/Backspace';
import { WhiteText } from '../../../../../../common/common.styles';
import { RoundTouchable } from './RoundButton.styles';

type TRoundButton = {
  text: number;
  isEmptyButton?: boolean;
  isRemoveButton?: boolean;
  onPress: () => void;
};

const RoundButton: FC<TRoundButton> = ({ text, isEmptyButton, isRemoveButton, onPress }) => {
  const renderContent = useMemo(() => {
    if (isRemoveButton) {
      return <Backspace width={24} height={24} />
    }

    return <WhiteText fontSize={16}>{!isEmptyButton ? text : ''}</WhiteText>
  }, [isRemoveButton, isEmptyButton, text]);

  return (
    <RoundTouchable
      onPress={onPress}
      isEmptyButton={isEmptyButton}
      disabled={isEmptyButton}
      isRemoveButton={isRemoveButton}>
      {renderContent}
    </RoundTouchable>
  );
};

export default RoundButton;
