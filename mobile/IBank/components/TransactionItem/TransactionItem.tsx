import { Flex, Text, View } from 'native-base';
import React, { FC } from 'react';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { getTransactionIconByType, getTransactionTitleByType } from '../../helpers/GeneralHelpers';

type TTransactionItem = {
  type: string;
  additionalText: string;
  amount: number;
};

const TransactionItem: FC<TTransactionItem> = ({ type, additionalText, amount }) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between" mb={15}>
      <Flex flexDirection="row" alignItems="center">
        <View mr={5}>{getTransactionIconByType(type)}</View>

        <View>
          <WhiteText fontWeight={600}>{getTransactionTitleByType(type)}</WhiteText>
          <Text color={colors.blueGray200} fontSize={12}>
            {additionalText}
          </Text>
        </View>
      </Flex>

      <View alignContent="flex-end">
        <WhiteText fontSize={18}>{amount} $</WhiteText>
      </View>
    </Flex>
  );
};

export default TransactionItem;
