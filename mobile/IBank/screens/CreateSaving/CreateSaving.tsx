import { Center, Input, KeyboardAvoidingView, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { BottleIcon } from '../../assets/svg';
import { BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { getKeyboardVerticalOffset, isIOS } from '../../config/platform';

const keyboardVerticalOffset = getKeyboardVerticalOffset();
const rotateStyle = { transform: [{ rotate: '75deg' }] };

const CreateSaving = () => {
  const [text, setText] = useState('For ');

  return (
    <BlackContentWrapper>
      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoiding}
        behavior={isIOS() ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
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
            <Text color={colors.gray500}>For what do you want to save?</Text>
          </Center>

          <Input
            mt="-20px"
            autoFocus
            value={text}
            fontSize={24}
            textAlign="center"
            color={colors.gray100}
            borderColor={colors.black}
            onChangeText={value => value.length >= 4 && setText(value)}
            _focus={{ backgroundColor: colors.black, borderColor: colors.black }}
          />
        </VStack>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default CreateSaving;
