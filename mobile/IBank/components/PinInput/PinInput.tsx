import React, { FC } from 'react';
import { Input } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../config/colors';
import { Visibility, VisibilityOff } from '../../assets/svg';

type TPinInput = {
  pin: string;
  showPin: boolean;
  placeholder?: string;
  isMaxWidth?: boolean;
  setPin: (pin: string) => void;
  setShowPin: (showPin: boolean) => void;
};

const PinInput: FC<TPinInput> = ({ pin, setPin, showPin, setShowPin, placeholder, isMaxWidth }) => {
  return (
    <>
      <Input
        size="lg"
        variant="underlined"
        keyboardType="numeric"
        placeholder={placeholder || 'Enter pin'}
        maxW={isMaxWidth ? '100%' : 300}
        maxLength={4}
        color={colors.gray100}
        borderBottomColor={colors.gray100}
        placeholderTextColor={colors.gray100}
        underlineColorAndroid={colors.gray100}
        value={pin}
        onChangeText={text => setPin(text)}
        type={showPin ? 'text' : 'password'}
        InputRightElement={
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            {showPin ? <VisibilityOff /> : <Visibility />}
          </TouchableOpacity>
        }
      />
    </>
  );
};

export default PinInput;
