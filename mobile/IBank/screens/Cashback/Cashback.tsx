import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { AddIcon, Avatar, CheckCircleIcon, HStack, Text, View, VStack } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { TopUpIconV2 } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { IBankButtonWithIcon } from '../../components';
import { colors } from '../../config/colors';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { useCurrentUser } from '../../hooks';
import { TCashback } from '../../types/cashback';
import { GET_CASHBACKS } from './gql/Cashback.queries';

const Cashback = () => {
  const { setOptions } = useNavigation();
  const { user } = useCurrentUser();

  useEffect(() => {
    setOptions({
      headerTitle: 'Your cashback',
      headerStyle: { backgroundColor: colors.green3, shadowColor: colors.green3 },
    });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_CASHBACKS);

  const renderItem = useCallback(
    ({ item }: { item: TCashback }) => {
      return (
        <HStack justifyContent="space-between" alignItems="center" mb="15px">
          <HStack alignItems="center" space={4}>
            <Avatar
              bg={colors.green1}
              w="40px"
              h="40px"
              source={{
                uri: item.image,
              }}>
              {item.title}
            </Avatar>

            <VStack>
              <WhiteText fontWeight={600} fontSize={16}>
                {item.title}
              </WhiteText>
              <Text color={colors.gray500}>{item.percent}%</Text>
            </VStack>
          </HStack>

          <TouchableOpacity>
            {user && item.connectedInUsers.includes(user?._id) ? (
              <CheckCircleIcon color={colors.gray100} />
            ) : (
              <AddIcon color={colors.gray100} />
            )}
          </TouchableOpacity>
        </HStack>
      );
    },
    [user],
  );

  return (
    <BlackContentWrapper withoutPadding>
      <View backgroundColor={colors.green3} pb={50}>
        <WhiteText textAlign="center" fontSize={40}>
          {getFormattedAmount(123)} $
        </WhiteText>

        <View position="absolute" bottom={-20} w="100%" pl="16px" pr="16px">
          <IBankButtonWithIcon
            text="Withdraw cashback"
            icon={<TopUpIconV2 />}
            backgroundColor={colors.pink}
            onPress={() => console.log('123')}
          />
        </View>
      </View>

      <View h="100%" px="16px" pt={55}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlashList data={data?.getCashbacks} renderItem={renderItem} estimatedItemSize={24} />
        )}
      </View>
    </BlackContentWrapper>
  );
};

export default Cashback;
