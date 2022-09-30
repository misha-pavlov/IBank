import React, { FC, useCallback } from 'react';
import { FormControl, InfoOutlineIcon, Input, Stack, Text } from 'native-base';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { colors } from '../../config/colors';

type TPhoneInput = {
  value: string;
  setValue: (value: string) => void;
};

const PhoneInput: FC<TPhoneInput> = ({ value, setValue }) => {
  const onChangeText = useCallback(
    (text: string) => {
      try {
        const phoneNumber = parsePhoneNumberWithError(text).formatInternational();
        setValue(phoneNumber);
      } catch (error) {
        // Not a phone number, non-existent country, etc.
        setValue(text);
      }
    },
    [setValue],
  );

  return (
    <>
      <FormControl.HelperText>
        <Stack direction="row" alignItems="center" space="xs">
          <InfoOutlineIcon size="sm" color={colors.grey500} />
          <Text color={colors.grey500} fontSize={12}>
            Attention! Need to enter a country prefix.
          </Text>
        </Stack>
      </FormControl.HelperText>
      <Input
        size="lg"
        variant="underlined"
        keyboardType="phone-pad"
        placeholder="Enter phone"
        color={colors.grey100}
        borderBottomColor={colors.grey100}
        placeholderTextColor={colors.grey100}
        underlineColorAndroid={colors.grey100}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    </>
  );
};

export default PhoneInput;
