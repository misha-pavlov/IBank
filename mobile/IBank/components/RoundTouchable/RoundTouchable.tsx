import { View } from 'native-base';
import React, { FC, useMemo } from 'react';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { RTouchable } from './RoundTouchable.styles';

type TRoundTouchable = {
  text?: string;
  backgroundColor?: string;
  icon: JSX.Element;
  onPress: () => void;
};

const RoundTouchable: FC<TRoundTouchable> = ({ backgroundColor = colors.black, icon, onPress, text }) => {
  const renderTextContent = useMemo(() => {
    if (text) {
      return (
        <WhiteText textAlign="center" maxW="60px" fontSize="12px">
          {text}
        </WhiteText>
      );
    }

    return null;
  }, [text]);

  return (
    <RTouchable onPress={onPress}>
      <View backgroundColor={backgroundColor} borderRadius={50} p="10px" maxW="44px">
        {icon}
      </View>
      {renderTextContent}
    </RTouchable>
  );
};

export default RoundTouchable;
