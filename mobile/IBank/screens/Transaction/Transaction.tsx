import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { Center, Divider, HStack, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { WalletIcon } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { getTransactionIconByType } from '../../helpers/transactionHelpers';
import { NCardNavigatorNavigationProp, NCardNavigatorRouteProp } from '../../navigation/types/CardNavigator.types';

const Transaction = () => {
  const { setOptions } = useNavigation<NCardNavigatorNavigationProp<'Transaction'>>();
  const { params } = useRoute<NCardNavigatorRouteProp<'Transaction'>>();
  const { type, title, createdAt, amount, amountOnCardAfter } = params;
  console.log('🚀 ~ file: Transaction.tsx:8 ~ Transaction ~ params', params);

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.lightGreen, shadowColor: colors.lightGreen } });
  }, [setOptions]);

  return (
    <BlackContentWrapper withoutPadding position="relative">
      <View backgroundColor={colors.lightGreen} pb={25} />

      <View position="absolute" left={0} right={0}>
        {getTransactionIconByType(type)}
      </View>

      <Center px={16}>
        <WhiteText mt={30} fontSize={18} fontWeight={600}>
          {title}
        </WhiteText>

        <HStack mt={30} justifyContent="space-between" alignItems="center" space={4}>
          <Divider w="50%" />
          <View backgroundColor={colors.darkGreen5} padding="8px" borderRadius={50}>
            <WhiteText>{type.toLowerCase().replace(/_/g, ' ')}</WhiteText>
          </View>
          <Divider w="50%" />
        </HStack>

        <Text mt={30} color={colors.gray500}>
          {moment(createdAt).format('DD MMMM YYYY, HH:MM')}
        </Text>

        <WhiteText mt={30} fontSize={45} fontWeight={600}>
          {getFormattedAmount(amount)} $
        </WhiteText>
      </Center>

      <HStack backgroundColor={colors.black2} mt={30} mx="16px" borderRadius={15} space={4} alignItems="center" p="8px">
        <View backgroundColor={colors.darkGreen5} borderRadius={50} p="8px">
          <WalletIcon />
        </View>

        <VStack>
          <Text color={colors.gray500}>New amount on card after transaction</Text>
          <WhiteText>{getFormattedAmount(amountOnCardAfter)} $</WhiteText>
        </VStack>
      </HStack>
    </BlackContentWrapper>
  );
};

export default Transaction;
