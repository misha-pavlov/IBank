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
        color={colors.grey100}
        borderBottomColor={colors.grey100}
        placeholderTextColor={colors.grey100}
        underlineColorAndroid={colors.grey100}
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
