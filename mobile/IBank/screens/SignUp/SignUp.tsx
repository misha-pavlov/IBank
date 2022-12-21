import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Center, FormControl, Stack, Select, Radio } from 'native-base';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useMutation } from '@apollo/client';
// styles
import { BankNameHeader, NextButton, ScrollableBlackContentWrapper, WhiteText } from '../../common/common.styles';
import { signUpStyles } from './SignUp.styles';
// constans
import { constants } from '../../config/constants';
import { colors } from '../../config/colors';
// components
import { DefaultInput, PhoneInput, PinInput } from '../../components';
// gql
import { SIGN_UP } from './gql/SignUp.mutations';
import { CREATE_CARD } from '../../gql/card.mutations';
// helpers
import { isTrueSet } from './SignUp.helpers';
// types
import { UserSex } from '../../types/user';
import { CardType } from '../../types/card';
// hooks
import { useUserLoggedIn } from '../../hooks';

const SignUp = () => {
  const [fields, setFields] = useState({
    phone: '',
    pin: '',
    fullName: '',
    birthday: '',
    sex: '',
    // use string for Radio component
    isMasterCard: 'true',
    type: '',
  });

  const [showPin, setShowPin] = useState(false);
  const [newUserId, setNewUserId] = useState(null);
  const [newUserFullName, setNewUserFullName] = useState('');
  const [newUserJWT, setNewUserJWT] = useState();

  const { setUserAsLoggedIn } = useUserLoggedIn();

  const [signUpMutate] = useMutation(SIGN_UP, {
    onError: e => console.error('SIGN_UP = ', e),
  });
  const [createCardMutate] = useMutation(CREATE_CARD, {
    onError: e => console.error('CREATE_CARD = ', e),
  });

  useEffect(() => {
    if (newUserId && newUserJWT) {
      const { pin, isMasterCard, type } = fields;

      createCardMutate({
        variables: {
          pin,
          owner: newUserId,
          ownerFullName: newUserFullName,
          isMasterCard: isTrueSet(isMasterCard),
          type: type,
        },
        onCompleted: () => setUserAsLoggedIn(newUserJWT),
      });
    }
  }, [createCardMutate, fields, newUserId, newUserJWT, setUserAsLoggedIn, newUserFullName]);

  const onFieldChange = useCallback((value: string, field: string) => {
    setFields(prevProps => ({ ...prevProps, [field]: value }));
  }, []);

  const onChangeDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      setFields({ ...fields, birthday: moment(new Date(selectedDate || '')).toString() });
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

    await signUpMutate({
      variables: {
        phone,
        pin,
        fullName,
        birthday,
        sex,
      },
      onCompleted: ({ signUp }) => {
        setNewUserJWT(signUp.token);
        setNewUserId(signUp.newUserId);
        setNewUserFullName(signUp.newUserFullName);
      },
    });
  }, [fields, signUpMutate]);

  return (
    <ScrollableBlackContentWrapper>
      <Stack direction="row" justifyContent="center">
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
              value={moment(fields.birthday === '' ? new Date() : new Date(fields.birthday)).toDate()}
              onChange={onChangeDate}
            />
          </Stack>

          <Stack mt="30px">
            <Select
              selectedValue={fields.sex}
              placeholder="Select sex"
              variant="filled"
              placeholderTextColor={colors.gray100}
              color={colors.gray100}
              onValueChange={value => onFieldChange(value, 'sex')}>
              <Select.Item label="Male" value={UserSex.M} />
              <Select.Item label="Female" value={UserSex.F} />
            </Select>
          </Stack>

          <Stack mt="30px">
            <Radio.Group
              name="isMasterCard"
              value={fields.isMasterCard}
              onChange={value => onFieldChange(value, 'isMasterCard')}>
              <Radio value="true" my={1} size="sm">
                <WhiteText>Master Card</WhiteText>
              </Radio>
              <Radio value="false" my={1} size="sm">
                <WhiteText>Visa</WhiteText>
              </Radio>
            </Radio.Group>
          </Stack>

          <Stack mt="30px">
            <Select
              selectedValue={fields.type}
              placeholder="Select your first card type"
              variant="filled"
              placeholderTextColor={colors.gray100}
              color={colors.gray100}
              onValueChange={value => onFieldChange(value, 'type')}>
              <Select.Item label="Black" value={CardType.BLACK} />
              <Select.Item label="Iron" value={CardType.IRON} />
              <Select.Item label="Platinum" value={CardType.PLATINUM} />
            </Select>
          </Stack>
        </FormControl>

        <NextButton disabled={!isDisabled} onPress={onPress}>
          <WhiteText>Finish</WhiteText>
        </NextButton>
      </Center>
    </ScrollableBlackContentWrapper>
  );
};

export default SignUp;
