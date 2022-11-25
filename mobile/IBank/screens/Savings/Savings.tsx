import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Center, HStack, Progress, Text, View, VStack } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
// svg
import { BottleIcon } from '../../assets/svg';
// styles
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
// components
import { IBankButtonWithIcon } from '../../components';
// constants
import { colors } from '../../config/colors';
import { savingsEnum } from '../../config/screens';
// hooks
import { useCurrentUser } from '../../hooks';
// types
import { NSavingsNavigatorNavigationProp } from '../../navigation/types/SavingsNavigator.types';
import { TSaving } from '../../types/saving';
// gql
import { GET_SAVINGS_FOR_USER } from '../../gql/saving.queries';
import { GET_USER_SAVINGS_SAVED_SUM } from './Savngs.queries';

const Savings = () => {
  const { setOptions, navigate } = useNavigation<NSavingsNavigatorNavigationProp<'CreateSaving' | 'Saving'>>();
  const { width, height } = useWindowDimensions();
  const { user } = useCurrentUser();

  useEffect(() => {
    setOptions({
      headerTitle: 'Savings',
      headerStyle: { backgroundColor: colors.blue, shadowColor: colors.blue },
    });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_SAVINGS_FOR_USER, { variables: { owner: user?._id }, skip: !user?._id });
  const { data: savedData, loading: savedLoading } = useQuery(GET_USER_SAVINGS_SAVED_SUM, {
    variables: { owner: user?._id },
    skip: !user?._id,
  });

  const renderItem = useCallback(
    ({ item }: { item: TSaving }) => {
      const { name, savingPoint, saved, _id } = item;

      return (
        <TouchableOpacity onPress={() => navigate(savingsEnum.Saving, { savingId: _id })}>
          <HStack space={4} alignItems="center" mb="10px">
            <View backgroundColor={colors.aqua} padding="8px" borderRadius={50}>
              <BottleIcon />
            </View>

            {/* 32 - padding wrapper, 40 - icon size, 16 - space */}
            <VStack space={1} w={width - 32 - 40 - 16}>
              <HStack justifyContent="space-between" alignItems="center">
                <WhiteText fontSize={16}>{name}</WhiteText>
                <WhiteText>{savingPoint} $</WhiteText>
              </HStack>

              <Progress
                value={(saved / savingPoint) * 100}
                w="100%"
                h={1}
                bg={colors.black1}
                _filledTrack={{
                  bg: colors.pink,
                }}
              />

              <Text color={colors.gray500}>Saved {saved} $</Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      );
    },
    [navigate, width],
  );

  return (
    <BlackContentWrapper withoutPadding>
      <Center backgroundColor={colors.blue} p="16px" pb="72px" position="relative">
        <WhiteText fontSize={15}>Use "Savings" for accumulation your money</WhiteText>

        <View position="absolute" bottom={-20} w="100%">
          <IBankButtonWithIcon
            text="Create saving"
            icon={<BottleIcon />}
            backgroundColor={colors.pink}
            onPress={() => navigate(savingsEnum.CreateSaving)}
          />
        </View>
      </Center>

      <View mt={35} px="16px">
        <WhiteText fontSize={16}>Your savings</WhiteText>
        {savedLoading ? (
          <ActivityIndicator />
        ) : (
          <Text color={colors.gray500} mb="16px">
            Sum {savedData?.getUserSavingsSavedSum} $
          </Text>
        )}

        <View height={(height / 100) * 90}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlashList data={data?.getSavingsForUser} estimatedItemSize={69} renderItem={renderItem} />
          )}
        </View>
      </View>
    </BlackContentWrapper>
  );
};

export default Savings;
