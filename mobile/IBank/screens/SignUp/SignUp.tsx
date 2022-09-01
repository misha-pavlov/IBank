import React, { useCallback, useState } from 'react';
import { Box, Center, FormControl, Stack } from 'native-base';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  BankNameHeader,
  BlackContentWrapper,
  WhiteText,
} from '../../common/common.styles';
import { constants } from '../../config/constants';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import PinInput from '../../components/PinInput/PinInput';
import DefaultInput from '../../components/DefaultInput/DefaultInput';
import { signUpStyles } from './SignUp.styles';

const SignUp = () => {
  const [fields, setFields] = useState({
    phone: '',
    pin: '',
    fullName: '',
    birthday: '',
  });
  const [showPin, setShowPin] = useState(false);

  const onFieldChange = useCallback(
    (value: string, field: string) => {
      setFields({ ...fields, [field]: value });
    },
    [fields],
  );

  const onChangeDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      setFields({ ...fields, birthday: moment(selectedDate || '').toString() });
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
          <PhoneInput
            value={fields.phone}
            setValue={value => onFieldChange(value, 'phone')}
          />

          <Box mt="30px">
            <PinInput
              pin={fields.pin}
              showPin={showPin}
              setPin={value => onFieldChange(value, 'pin')}
              setShowPin={setShowPin}
            />
          </Box>

          <DefaultInput
            value={fields.fullName}
            placeholder="Enter your full name"
            withMarginTop
            setValue={value => onFieldChange(value, 'fullName')}
          />

          <Stack mt="30px" flexDirection="row" alignItems="center">
            <WhiteText>Enter birthday: </WhiteText>
            <DateTimePicker
              mode="date"
              style={signUpStyles.birthdayPicker}
              value={moment(
                fields.birthday === '' ? new Date() : fields.birthday,
              ).toDate()}
              onChange={onChangeDate}
            />
          </Stack>
        </FormControl>
      </Center>
    </BlackContentWrapper>
  );
};

export default SignUp;
