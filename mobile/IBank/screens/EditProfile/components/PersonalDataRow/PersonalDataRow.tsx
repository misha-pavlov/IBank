import { Flex, Input, Text } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { isEqual } from 'lodash';
import { WhiteText } from '../../../../common/common.styles';
import { colors } from '../../../../config/colors';
import { IconWrapper } from './PersonalDataRow.styles';

type TPersonalDataRow = {
  label: string;
  text: string;
  iconColor: string;
  fieldName?: string;
  disabled?: boolean;
  withMarginTop?: boolean;
  icon: JSX.Element;
  onFieldChange?: (value: string | Date, field: string) => void;
};

const PersonalDataRow: FC<TPersonalDataRow> = ({
  label,
  text,
  iconColor,
  withMarginTop,
  icon,
  disabled,
  fieldName,
  onFieldChange,
}) => {
  const [isShowInput, setIsShowInput] = useState(false);

  const isDate = fieldName === 'birthday';

  const renderInputText = useMemo(() => {
    if (isDate && onFieldChange) {
      return (
        <DateTimePicker
          mode="date"
          value={moment(text).toDate()}
          onChange={(event, selectedDate) => onFieldChange(moment(selectedDate).toString(), fieldName)}
        />
      );
    }

    if (isShowInput) {
      return (
        <Input
          autoFocus
          minW={150}
          value={text}
          variant="underlined"
          color={colors.gray100}
          onChangeText={newText => onFieldChange && fieldName && onFieldChange(newText, fieldName)}
          onSubmitEditing={() => {
            setIsShowInput(false);
          }}
        />
      );
    }

    return (
      <TouchableOpacity disabled={disabled} onPress={() => setIsShowInput(true)}>
        <WhiteText fontWeight={500}>{text}</WhiteText>
      </TouchableOpacity>
    );
  }, [disabled, fieldName, isDate, isShowInput, onFieldChange, text]);

  return (
    <Flex flexDirection="row" alignItems="center" {...(withMarginTop && { mt: 25 })}>
      <IconWrapper backgroundColor={iconColor} isDate={isDate}>
        {icon}
      </IconWrapper>

      <Flex>
        <Text fontWeight={600} color={colors.gray500}>
          {label}
        </Text>

        {renderInputText}
      </Flex>
    </Flex>
  );
};

export default memo(PersonalDataRow, isEqual);
