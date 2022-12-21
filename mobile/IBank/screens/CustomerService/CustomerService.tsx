import { useNavigation } from '@react-navigation/native';
import { Center, Flex, HStack, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { PhoneIcon, TelegramIcon } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

const CustomerService = () => {
  const { setOptions } = useNavigation();
  const phoneNumber = '+1 773 399 9686';

  useEffect(() => {
    setOptions({ headerTitle: 'Customer service' });
  }, [setOptions]);

  return (
    <BlackContentWrapper>
      <Center>
        <TouchableOpacity>
          <Flex
            w={250}
            h={175}
            borderRadius={15}
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.black2}>
            <View backgroundColor={colors.gray100} borderRadius={50}>
              <TelegramIcon width={40} height={40} fill={colors.aqua1} />
            </View>

            <WhiteText mt="15px">Write into Telegram</WhiteText>
          </Flex>
        </TouchableOpacity>
      </Center>

      <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
        <HStack space={4} alignItems="center" mt={30}>
          <PhoneIcon />

          <VStack>
            <Text color={colors.gray500}>International phone number</Text>
            <WhiteText>{phoneNumber}</WhiteText>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </BlackContentWrapper>
  );
};

export default CustomerService;
