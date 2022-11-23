import { useNavigation } from '@react-navigation/native';
import { Center, HStack, Progress, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { BottleIcon } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { IBankButtonWithIcon } from '../../components';
import { colors } from '../../config/colors';

const Savings = () => {
  const { setOptions } = useNavigation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setOptions({
      headerTitle: 'Savings',
      headerStyle: { backgroundColor: colors.blue, shadowColor: colors.blue },
    });
  }, [setOptions]);

  return (
    <BlackContentWrapper withoutPadding>
      <Center backgroundColor={colors.blue} p="16px" pb="72px" position="relative">
        <WhiteText fontSize={15}>Use "Savings" for accumulation your money</WhiteText>

        <View position="absolute" bottom={-20} w="100%">
          <IBankButtonWithIcon
            text="Create saving"
            icon={<BottleIcon />}
            backgroundColor={colors.pink}
            onPress={() => console.log('123')}
          />
        </View>
      </Center>

      <View mt={35} px="16px">
        <WhiteText fontSize={16}>Your savings</WhiteText>
        <Text color={colors.gray500} mb="16px">
          Sum n $
        </Text>

        <TouchableOpacity>
          <HStack space={4} alignItems="center">
            <View backgroundColor={colors.aqua} padding="8px" borderRadius={50}>
              <BottleIcon />
            </View>

            {/* 32 - padding wrapper, 40 - icon size, 16 - space */}
            <VStack space={1} w={width - 32 - 40 - 16}>
              <HStack justifyContent="space-between" alignItems="center">
                <WhiteText fontSize={16}>Saving name</WhiteText>
                <WhiteText>123 $</WhiteText>
              </HStack>

              <Progress
                value={0}
                w="100%"
                h={1}
                bg={colors.black1}
                _filledTrack={{
                  bg: colors.pink,
                }}
              />

              <Text color={colors.gray500}>Saved n $</Text>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </View>
    </BlackContentWrapper>
  );
};

export default Savings;
