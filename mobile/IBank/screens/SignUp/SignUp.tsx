import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Box, Center, FormControl, Stack, Select } from 'native-base';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { isValidPhoneNumber } from 'libphonenumber-js';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useMutation } from '@apollo/client';
import { BankNameHeader, BlackContentWrapper, NextButton, WhiteText } from '../../common/common.styles';
import { signUpStyles } from './SignUp.styles';
import { constants } from '../../config/constants';
import { colors } from '../../config/colors';
import { actionCases } from '../../store/actionCases';
import { DefaultInput, PhoneInput, PinInput } from '../../components';
import { Context } from '../../store/store';
import { SIGN_UP } from './gql/SignUp.mutations';

const SignUp = () => {
  const [fields, setFields] = useState({
    phone: '',
    pin: '',
    fullName: '',
    birthday: '',
    sex: '',
  });
  const [showPin, setShowPin] = useState(false);

  const { dispatch } = useContext(Context);

  const [mutate] = useMutation(SIGN_UP, {
    onError: e => console.log('SIGN_UP = ', e),
  });

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

  const isDisabled = useMemo(() => {
    const { phone, pin, fullName, birthday, sex } = fields;
    return (
      isValidPhoneNumber(phone) &&
      phone.length >= 9 &&
      pin !== '' &&
      pin.length === 4 &&
      fullName !== '' &&
      birthday !== '' &&
      sex !== ''
    );
  }, [fields]);

  const onPress = useCallback(async () => {
    const { phone, pin, fullName, birthday, sex } = fields;

    await mutate({
      variables: {
        phone,
        pin,
        fullName,
        birthday,
        sex,
      },
      onCompleted: ({ signUp }) => console.log(signUp.token),
    });
    // await EncryptedStorage.setItem(constants.keys.USER_JWT, JSON.stringify({ USER_JWT: '123123' }));
    // dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: true });
  }, []);

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
          <PhoneInput value={fields.phone} setValue={value => onFieldChange(value, 'phone')} />

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
            placeholder="Enter full name"
            withMarginTop
            setValue={value => onFieldChange(value, 'fullName')}
          />

          <Stack mt="30px" flexDirection="row" alignItems="center">
            <WhiteText>Enter birthday: </WhiteText>
            <DateTimePicker
              mode="date"
              style={signUpStyles.birthdayPicker}
              value={moment(fields.birthday === '' ? new Date() : fields.birthday).toDate()}
              onChange={onChangeDate}
            />
          </Stack>

          <Stack mt="30px">
            <Select
              selectedValue={fields.sex}
              placeholder="Enter sex"
              variant="filled"
              placeholderTextColor={colors.gray100}
              color={colors.gray100}
              onValueChange={value => onFieldChange(value, 'sex')}>
              <Select.Item label="Male" value="m" />
              <Select.Item label="Female" value="f" />
            </Select>
          </Stack>
        </FormControl>

        <NextButton disabled={!isDisabled} onPress={onPress}>
          <WhiteText>Finish</WhiteText>
        </NextButton>
      </Center>
    </BlackContentWrapper>
  );
};

export default SignUp;
