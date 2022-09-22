import React, { FC } from 'react';
import { Input } from 'native-base';
import { colors } from '../../config/colors';

type TDefaultInput = {
  value: string;
  placeholder: string;

  withMarginTop?: boolean;

  setValue: (text: string) => void;
  onPress?: () => void;
};

const DefaultInput: FC<TDefaultInput> = ({ value, placeholder, withMarginTop, setValue, onPress }) => {
  return (
    <>
      <Input
        size="lg"
        variant="underlined"
        placeholder={placeholder}
        maxW={300}
        color={colors.gray100}
        borderBottomColor={colors.gray100}
        placeholderTextColor={colors.gray100}
        underlineColorAndroid={colors.gray100}
        value={value}
        onChangeText={text => setValue(text)}
        onPressIn={onPress}
        // don't need mt if withMarginTop false
        mt={withMarginTop ? '30px' : undefined}
      />
    </>
  );
};

export default DefaultInput;
