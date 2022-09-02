import React, { FC } from 'react';
import { Input } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../config/colors';
import VisibilityOff from '../../assets/svg/VisibilityOff';
import Visibility from '../../assets/svg/Visibility';

type TPinInput = {
  pin: string;
  showPin: boolean;
  setPin: (pin: string) => void;
  setShowPin: (showPin: boolean) => void;
};

const PinInput: FC<TPinInput> = ({ pin, setPin, showPin, setShowPin }) => {
  return (
    <>
      <Input
        size="lg"
        variant="underlined"
        keyboardType="numeric"
        placeholder="Enter pin"
        maxW={300}
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
