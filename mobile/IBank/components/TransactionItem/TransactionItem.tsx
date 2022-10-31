import { Flex, Text, View } from 'native-base';
import React, { FC, memo, useMemo } from 'react';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { getTransactionIconByType, getTransactionTitleByType } from '../../helpers/transactionHelpers';

type TTransactionItem = {
  type?: string;
  text?: string;
  amount?: number;
  icon?: JSX.Element;
  hideAmount?: boolean;
  additionalText?: string;
};

const TransactionItem: FC<TTransactionItem> = ({ type, additionalText, amount, hideAmount, icon, text }) => {
  const renderText = useMemo(() => {
    if (!additionalText) {
      return <WhiteText fontWeight={600}>{text || getTransactionTitleByType(type)}</WhiteText>;
    }

    return (
      <>
        <WhiteText fontWeight={600}>{text || getTransactionTitleByType(type)}</WhiteText>
        <Text color={colors.blueGray200} fontSize={12}>
          {additionalText}
        </Text>
      </>
    );
  }, []);

  return (
    <Flex flexDirection="row" justifyContent="space-between" mb={15}>
      <Flex flexDirection="row" alignItems="center">
        <View mr={5}>{icon || getTransactionIconByType(type)}</View>
        <View>{renderText}</View>
      </Flex>

      <Flex justifyContent="center">{!hideAmount && <WhiteText fontSize={18}>{amount} $</WhiteText>}</Flex>
    </Flex>
  );
};

export default memo(TransactionItem);
