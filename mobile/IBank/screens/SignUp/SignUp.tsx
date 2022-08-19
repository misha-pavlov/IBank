import React, { useCallback, useState } from 'react';
import { Box, Center, FormControl, Stack } from 'native-base';
import {
  BankNameHeader,
  BlackContentWrapper,
  WhiteText,
} from '../../common/common.styles';
import { constants } from '../../config/constants';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import PinInput from '../../components/PinInput/PinInput';

const SignUp = () => {
  const [fields, setFields] = useState({ phone: '', pin: '' });
  const [showPin, setShowPin] = useState(false);

  const onPhoneChange = useCallback(
    (value: string) => {
      setFields({ ...fields, phone: value });
    },
    [fields],
  );

  const onPinChange = useCallback(
    (value: string) => {
      setFields({ ...fields, pin: value });
    },
    [fields],
  );

  return (
    <BlackContentWrapper>
      <Stack direction="row" mt="40px" justifyContent="center">
        <BankNameHeader>{constants.appName}</BankNameHeader>
      </Stack>

      <Stack mt="20px" mb={25}>
        <WhiteText textAlign="center" fontSize={16}>
          Just enter this fields
        </WhiteText>
      </Stack>

      <Center>
        <FormControl w="75%" maxW="300px">
          <PhoneInput value={fields.phone} setValue={onPhoneChange} />

          <Box mt="30px">
            <PinInput
              pin={fields.pin}
              showPin={showPin}
              setPin={onPinChange}
              setShowPin={setShowPin}
            />
          </Box>
        </FormControl>
      </Center>
    </BlackContentWrapper>
  );
};

export default SignUp;
