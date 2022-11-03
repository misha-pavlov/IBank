import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Center, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { isValidPhoneNumber, parseIncompletePhoneNumber } from 'libphonenumber-js';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
// constants
import { colors } from '../../../../config/colors';
import { constants } from '../../../../config/constants';
import { authEnum } from '../../../../config/screens';
// styles
import { BackButtonText, MoveToSignUpText } from './SignInForms.styles';
import { WhiteText, NextButton } from '../../../../common/common.styles';
// svg
import { Visibility, VisibilityOff } from '../../../../assets/svg';
// types
import { NAuthNavigatorNavigationProp } from '../../../../navigation/types/AuthNavigator.types';
// components
import { PhoneInput, PinInput } from '../../../../components';
// gql
import { SIGN_IN } from './gql/SignInForms.mutations';
// hooks
import { useUserLoggedIn } from '../../../../hooks';

type TSignInForms = {
  currentStage: 'phone' | 'pin';
  setCurrentStage: Dispatch<SetStateAction<'phone' | 'pin'>>;
};

const SignInForms: FC<TSignInForms> = ({ currentStage, setCurrentStage }) => {
  const { navigate } = useNavigation<NAuthNavigatorNavigationProp<'SignUp'>>();

  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState('');
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const [signInMutate] = useMutation(SIGN_IN, { onError: e => console.error('SIGN_IN = ', e) });
  const { setUserAsLoggedIn } = useUserLoggedIn();

  const onPress = useCallback(() => {
    signInMutate({
      variables: {
        phone,
        pin,
      },
      onCompleted: ({ signIn }) => setUserAsLoggedIn(signIn.token),
    });
  }, [phone, pin, signInMutate, setUserAsLoggedIn]);

  const isInvalid = useMemo(() => {
    if (pin.length === confirmPin.length) {
      return pin !== confirmPin;
    }
  }, [pin, confirmPin]);

  const isDisabled = useMemo(() => {
    if (currentStage === constants.signUpStages.phone) {
      const parsedPhone = parseIncompletePhoneNumber(phone);
      return isValidPhoneNumber(parsedPhone) && phone.length >= 9;
    }

    return pin.length === 4 && confirmPin.length === 4 && !isInvalid;
  }, [phone, currentStage, pin, confirmPin, isInvalid]);

  const invalidStyles = useMemo(() => {
    if (isInvalid) {
      return {
        borderBottomColor: colors.red,
        underlineColorAndroid: colors.red,
      };
    }

    return {
      borderBottomColor: colors.gray100,
      underlineColorAndroid: colors.gray100,
    };
  }, [isInvalid]);

  const moveToSignUp = useCallback(() => {
    return navigate(authEnum.SignUp);
  }, [navigate]);

  const renderSection = useMemo(() => {
    if (currentStage === constants.signUpStages.phone) {
      return (
        <>
          <FormControl w="75%" maxW="300px">
            <PhoneInput value={phone} setValue={setPhone} />

            <Center>
              <NextButton disabled={!isDisabled} onPress={() => setCurrentStage(constants.signUpStages.pin)}>
                <WhiteText>Next</WhiteText>
              </NextButton>
            </Center>

            <TouchableOpacity onPress={moveToSignUp}>
              <MoveToSignUpText>Don't have account? Let's create.</MoveToSignUpText>
            </TouchableOpacity>
          </FormControl>
        </>
      );
    }

    return (
      <>
        <FormControl w="75%" maxW="300px">
          <PinInput pin={pin} showPin={showPin} setPin={setPin} setShowPin={setShowPin} />
        </FormControl>

        <FormControl isInvalid={isInvalid} w="75%" maxW="300px" mt={25}>
          <Input
            size="lg"
            variant="underlined"
            keyboardType="numeric"
            placeholder="Confirm your pin"
            color={colors.gray100}
            placeholderTextColor={colors.gray100}
            maxLength={4}
            value={confirmPin}
            onChangeText={text => setConfirmPin(text)}
            type={showConfirmPin ? 'text' : 'password'}
            InputRightElement={
              <TouchableOpacity onPress={() => setShowConfirmPin(!showConfirmPin)}>
                {showConfirmPin ? <VisibilityOff /> : <Visibility />}
              </TouchableOpacity>
            }
            {...invalidStyles}
          />
          {isInvalid && (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Error confirming pin
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <NextButton disabled={!isDisabled} onPress={onPress}>
          <WhiteText>Finish</WhiteText>
        </NextButton>

        <Stack mt={25}>
          <TouchableOpacity onPress={() => setCurrentStage(constants.signUpStages.phone)}>
            <BackButtonText>← Back to phone</BackButtonText>
          </TouchableOpacity>
        </Stack>
      </>
    );
  }, [
    pin,
    phone,
    onPress,
    showPin,
    isInvalid,
    confirmPin,
    isDisabled,
    moveToSignUp,
    currentStage,
    invalidStyles,
    showConfirmPin,
    setCurrentStage,
  ]);

  return <Center mt="30%">{renderSection}</Center>;
};

export default SignInForms;
