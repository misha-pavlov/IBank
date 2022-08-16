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
  InfoOutlineIcon,
  Input,
  Stack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import {
  isValidPhoneNumber,
  parseIncompletePhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import { colors } from '../../../../config/colors';
import { BackButtonText, NextButton } from './SinUpForms.styles';
import { WhiteText } from '../../../../common/common.styles';
import { constants } from '../../../../config/constants';
import Visibility from '../../../../assets/svg/Visibility';
import VisibilityOff from '../../../../assets/svg/VisibilityOff';

type TSinUpForms = {
  currentStage: 'phone' | 'pin';
  setCurrentStage: Dispatch<SetStateAction<'phone' | 'pin'>>;
};

const SinUpForms: FC<TSinUpForms> = ({ currentStage, setCurrentStage }) => {
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

  const onChangeText = useCallback((text: string) => {
    try {
      const phoneNumber = parsePhoneNumberWithError(text).formatInternational();
      setValue(phoneNumber);
    } catch (error) {
      // Not a phone number, non-existent country, etc.
      setValue(text);
    }
  }, []);

  const renderSection = useMemo(() => {
    if (currentStage === constants.signUpStages.phone) {
      return (
        <>
          <FormControl w="75%" maxW="300px">
            <FormControl.HelperText>
              <Stack direction="row" alignItems="center" space="xs">
                <InfoOutlineIcon size="sm" color={colors.gray500} />
                <Text color={colors.gray500} fontSize={12}>
                  Attention! Need to enter a country prefix.
                </Text>
              </Stack>
            </FormControl.HelperText>
            <Input
              size="lg"
              variant="underlined"
              keyboardType="phone-pad"
              placeholder="Enter your phone"
              color={colors.gray100}
              borderBottomColor={colors.gray100}
              placeholderTextColor={colors.gray100}
              underlineColorAndroid={colors.gray100}
              value={value}
              onChangeText={text => onChangeText(text)}
            />

            <Center>
              <NextButton
                disabled={!isDisabled}
                onPress={() => setCurrentStage(constants.signUpStages.pin)}>
                <WhiteText>Next</WhiteText>
              </NextButton>
            </Center>
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
    pin,
    value,
    setPin,
    showPin,
    setValue,
    isInvalid,
    isDisabled,
    confirmPin,
    setShowPin,
    currentStage,
    onChangeText,
    invalidStyles,
    setConfirmPin,
    showConfirmPin,
    setCurrentStage,
    setShowConfirmPin,
  ]);

  return <Center mt="30%">{renderSection}</Center>;
};

export default SinUpForms;
