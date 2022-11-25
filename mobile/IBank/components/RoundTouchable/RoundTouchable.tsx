import { View } from 'native-base';
import React, { FC, useMemo } from 'react';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { RTouchable } from './RoundTouchable.styles';

type TRoundTouchable = {
  icon: JSX.Element;
  text?: string;
  disabled?: boolean;
  withBorder?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
};

const RoundTouchable: FC<TRoundTouchable> = ({
  backgroundColor = colors.black,
  icon,
  withBorder,
  onPress,
  text,
  disabled,
}) => {
  const renderTextContent = useMemo(() => {
    if (text) {
      return (
        <WhiteText textAlign="center" maxW="60px" fontSize="12px" pt="5px">
          {text}
        </WhiteText>
      );
    }

    return null;
  }, [text]);

  return (
    <RTouchable onPress={onPress} disabled={disabled}>
      <View
        p="10px"
        maxW="44px"
        borderRadius={50}
        alignItems="center"
        justifyContent="center"
        backgroundColor={backgroundColor}
        {...(withBorder && { borderColor: colors.gray100, borderWidth: 1 })}>
        {icon}
      </View>
      {renderTextContent}
    </RTouchable>
  );
};

export default RoundTouchable;
