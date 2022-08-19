import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Center,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import {
  isValidPhoneNumber,
  parseIncompletePhoneNumber,
} from 'libphonenumber-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../config/colors';
import {
  BackButtonText,
  NextButton,
  MoveToSignUpText,
} from './SignInForms.styles';
import { WhiteText } from '../../../../common/common.styles';
import { constants } from '../../../../config/constants';
import Visibility from '../../../../assets/svg/Visibility';
import VisibilityOff from '../../../../assets/svg/VisibilityOff';
import { NAuthNavigatorNavigationProp } from '../../../../navigation/types/AuthNavigator.types';
import { screens } from '../../../../config/screens';
import PhoneInput from '../../../../components/PhoneInput/PhoneInput';

type TSignInForms = {
  currentStage: 'phone' | 'pin';
  setCurrentStage: Dispatch<SetStateAction<'phone' | 'pin'>>;
};

const SignInForms: FC<TSignInForms> = ({ currentStage, setCurrentStage }) => {
  const navigation = useNavigation<NAuthNavigatorNavigationProp<'SignUp'>>();

  const [value, setValue] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState('');
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const isInvalid = useMemo(() => {
    if (pin.length === confirmPin.length) {
      return pin !== confirmPin;
    }
  }, [pin, confirmPin]);

  const isDisabled = useMemo(() => {
    if (currentStage === constants.signUpStages.phone) {
      const phone = parseIncompletePhoneNumber(value);
      return isValidPhoneNumber(phone) && value.length >= 9;
    }

    return pin.length === 4 && confirmPin.length === 4 && !isInvalid;
  }, [value, currentStage, pin, confirmPin, isInvalid]);

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
    return navigation.navigate(screens.auth.SignUp);
  }, [navigation]);

  const renderSection = useMemo(() => {
    if (currentStage === constants.signUpStages.phone) {
      return (
        <>
          <FormControl w="75%" maxW="300px">
            <PhoneInput value={value} setValue={setValue} />

            <Center>
              <NextButton
                disabled={!isDisabled}
                onPress={() => setCurrentStage(constants.signUpStages.pin)}>
                <WhiteText>Next</WhiteText>
              </NextButton>
            </Center>

            <TouchableOpacity onPress={moveToSignUp}>
              <MoveToSignUpText>
                Don't have account? Let's create.
              </MoveToSignUpText>
            </TouchableOpacity>
          </FormControl>
        </>
      );
    }

    return (
      <>
        <Input
          w="75%"
          size="lg"
          variant="underlined"
          keyboardType="numeric"
          placeholder="Enter your pin"
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
              <TouchableOpacity
                onPress={() => setShowConfirmPin(!showConfirmPin)}>
                {showConfirmPin ? <VisibilityOff /> : <Visibility />}
              </TouchableOpacity>
            }
            {...invalidStyles}
          />
          {isInvalid && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Error confirming pin
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <NextButton disabled={!isDisabled}>
          <WhiteText>Finish</WhiteText>
        </NextButton>

        <Stack mt={25}>
          <TouchableOpacity
            onPress={() => setCurrentStage(constants.signUpStages.phone)}>
            <BackButtonText>← Back to phone</BackButtonText>
          </TouchableOpacity>
        </Stack>
      </>
    );
  }, [
    currentStage,
    pin,
    showPin,
    isInvalid,
    confirmPin,
    showConfirmPin,
    invalidStyles,
    isDisabled,
    value,
    moveToSignUp,
    setCurrentStage,
  ]);

  return <Center mt="30%">{renderSection}</Center>;
};

export default SignInForms;
