import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isEqual, isFunction } from 'lodash';
import { Center, Input, KeyboardAvoidingView, ScrollView, Text, View, VStack } from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import { BottleIcon } from '../../assets/svg';
import { BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { IBankBlackButton } from '../../components';
import { colors } from '../../config/colors';
import { getKeyboardVerticalOffset, isIOS } from '../../config/platform';
import { GET_SAVINGS_FOR_USER, GET_SAVING_BY_ID, GET_USER_SAVINGS_SAVED_SUM } from '../../gql/saving.queries';
import { useCurrentUser } from '../../hooks';
import { NSavingsNavigatorRouteProp } from '../../navigation/types/SavingsNavigator.types';
import { getUpdateAdditionalVariables } from './CreateSaving.helpers';
import { CREATE_SAVING } from './CreateSaving.mutations';

const keyboardVerticalOffset = getKeyboardVerticalOffset();
const rotateStyle = { transform: [{ rotate: '75deg' }] };

const CreateSaving = () => {
  const { user } = useCurrentUser();
  const { goBack } = useNavigation();
  const { params } = useRoute<NSavingsNavigatorRouteProp<'CreateSaving'>>();
  // params
  const field = params?.field;
  const oneStep = params?.oneStep;
  const oldValue = params?.oldValue;
  const savingId = params?.savingId;
  const onCompleted = params?.onCompleted;

  const [step, setStep] = useState(oneStep || 1);
  const [text, setText] = useState(typeof oldValue === 'string' ? oldValue : 'For ');
  const [savingPoint, setSavingPoint] = useState(typeof oldValue === 'number' ? oldValue : 0);

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
    if (oneStep && isFunction(onCompleted) && field) {
      onCompleted({
        variables: {
          savingId,
          ...getUpdateAdditionalVariables(field, typeof oldValue === 'string' ? text : savingPoint),
        },
        onCompleted: goBack,
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: GET_SAVING_BY_ID, variables: { savingId } },
          { query: GET_SAVINGS_FOR_USER, variables: { owner: user?._id } },
          { query: GET_USER_SAVINGS_SAVED_SUM, variables: { owner: user?._id }, skip: !user?._id },
        ],
      });
    } else {
      if (isFirstStep) {
        setStep(2);
      } else {
        createSavingMutate({
          variables: { name: text, savingPoint, owner: user?._id },
          onCompleted: goBack,
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GET_SAVINGS_FOR_USER, variables: { owner: user?._id } }],
        });
      }
    }
  }, [
    createSavingMutate,
    field,
    goBack,
    isFirstStep,
    oldValue,
    onCompleted,
    oneStep,
    savingId,
    savingPoint,
    text,
    user?._id,
  ]);

  const getText = () => {
    if (oneStep) {
      return 'Update';
    }

    return isFirstStep ? 'Next' : 'Create';
  };

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
          text={getText()}
          disabled={isFirstStep ? text.length === 4 : savingPoint === 0}
        />
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default memo(CreateSaving, isEqual);
