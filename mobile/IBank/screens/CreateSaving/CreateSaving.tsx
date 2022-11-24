import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Center, Input, KeyboardAvoidingView, ScrollView, Text, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { BottleIcon } from '../../assets/svg';
import { BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { IBankBlackButton } from '../../components';
import { colors } from '../../config/colors';
import { getKeyboardVerticalOffset, isIOS } from '../../config/platform';
import { useCurrentUser } from '../../hooks';
import { CREATE_SAVING } from './CreateSaving.mutations';

const keyboardVerticalOffset = getKeyboardVerticalOffset();
const rotateStyle = { transform: [{ rotate: '75deg' }] };

const CreateSaving = () => {
  const { user } = useCurrentUser();
  const { goBack } = useNavigation();

  const [step, setStep] = useState(1);
  const [text, setText] = useState('For ');
  const [savingPoint, setSavingPoint] = useState(0);

  const isFirstStep = step === 1;

  const [createSavingMutate] = useMutation(CREATE_SAVING, { onError: err => console.error('CREATE_SAVING = ', err) });

  const onChangeText = useCallback(
    (value: string) => {
      if (isFirstStep) {
        return value.length >= 4 && setText(value);
      }

      return setSavingPoint(Number(value));
    },
    [isFirstStep],
  );

  const onPress = useCallback(() => {
    if (isFirstStep) {
      setStep(2);
    } else {
      createSavingMutate({ variables: { name: text, savingPoint, owner: user?._id }, onCompleted: goBack });
    }
  }, [createSavingMutate, goBack, isFirstStep, savingPoint, text, user?._id]);

  return (
    <BlackContentWrapper>
      <ScrollView>
        <VStack space={6}>
          <Center position="relative">
            <View
              w={200}
              h={200}
              borderRadius={35}
              position="absolute"
              style={rotateStyle}
              backgroundColor={colors.pink1}
            />

            <BottleIcon width={225} height={225} />
          </Center>

          <Center>
            <Text color={colors.gray500}>
              {isFirstStep ? 'For what do you want to save?' : 'What is the point amount?'}
            </Text>
          </Center>

          <Input
            mt="-20px"
            autoFocus
            fontSize={24}
            textAlign="center"
            color={colors.gray100}
            borderColor={colors.black}
            onChangeText={onChangeText}
            keyboardType={isFirstStep ? 'default' : 'numeric'}
            // TODO: add format
            value={isFirstStep ? text : savingPoint.toString()}
            _focus={{ backgroundColor: colors.black, borderColor: colors.black }}
          />
        </VStack>
      </ScrollView>

      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoiding}
        behavior={isIOS() ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <IBankBlackButton
          isRed
          onPress={onPress}
          text={isFirstStep ? 'Next' : 'Create'}
          disabled={isFirstStep ? text.length === 4 : savingPoint === 0}
        />
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default CreateSaving;
