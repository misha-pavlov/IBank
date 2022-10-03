import { Flex, Input, Text } from 'native-base';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../../../../../../../common/common.styles';
import { colors } from '../../../../../../../../config/colors';
import { IconWrapper } from './PersonalDataRow.styles';

type TPersonalDataRow = {
  label: string;
  text: string;
  iconColor: string;
  disabled?: boolean;
  withMarginTop?: boolean;
  icon: JSX.Element;
};

const PersonalDataRow: FC<TPersonalDataRow> = ({ label, text, iconColor, withMarginTop, icon, disabled }) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [inputText, setInputText] = useState(text);

  const changeInputText = useCallback((value: string) => {
    setInputText(value);
  }, []);

  const renderInputText = useMemo(() => {
    if (isShowInput) {
      return (
        <Input
          autoFocus
          value={inputText}
          variant="underlined"
          color={colors.gray100}
          onChangeText={changeInputText}
          onSubmitEditing={() => setIsShowInput(false)}
        />
      );
    }

    return (
      <TouchableOpacity disabled={disabled} onPress={() => setIsShowInput(true)}>
        <WhiteText fontWeight={500}>{text}</WhiteText>
      </TouchableOpacity>
    );
  }, [changeInputText, disabled, inputText, isShowInput, text]);

  return (
    <Flex flexDirection="row" {...(withMarginTop && { mt: 25 })}>
      <IconWrapper backgroundColor={iconColor}>{icon}</IconWrapper>

      <Flex>
        <Text fontWeight={600} color={colors.gray500}>
          {label}
        </Text>

        {renderInputText}
      </Flex>
    </Flex>
  );
};

export default PersonalDataRow;
