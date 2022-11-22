import { isEqual, isFunction } from 'lodash';
import { Flex, Text, View } from 'native-base';
import React, { FC, memo, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { getTransactionIconByType, getTransactionTitleByType } from '../../helpers/transactionHelpers';

type TTransactionItem = {
  type?: string;
  text?: string;
  amount?: number;
  disabled?: boolean;
  icon?: JSX.Element;
  additionalText?: string;
  onPress?: () => void;
};

const TransactionItem: FC<TTransactionItem> = ({ type, additionalText, amount, disabled, icon, text, onPress }) => {
  const renderText = useMemo(() => {
    if (!additionalText) {
      return <WhiteText fontWeight={600}>{text || getTransactionTitleByType(type)}</WhiteText>;
    }

    return (
      <>
        <WhiteText fontWeight={600}>{text || getTransactionTitleByType(type)}</WhiteText>
        <Text color={colors.blueGray200} fontSize={12}>
          {additionalText.toLowerCase().replace(/_/g, ' ')}
        </Text>
      </>
    );
  }, [additionalText, text, type]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || !isFunction(onPress)}>
      <Flex flexDirection="row" justifyContent="space-between" mb={15}>
        <Flex flexDirection="row" alignItems="center">
          <View mr={5}>{icon || getTransactionIconByType(type)}</View>
          <View>{renderText}</View>
        </Flex>

        <Flex justifyContent="center">{amount && <WhiteText fontSize={18}>{amount} $</WhiteText>}</Flex>
      </Flex>
    </TouchableOpacity>
  );
};

export default memo(TransactionItem, isEqual);
