import { useNavigation } from '@react-navigation/native';
import { HStack, Text, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { CashbackIcon, PhoneIcon } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { moreEnum } from '../../config/screens';
import { NMoreNavigatorNavigationProp } from '../../navigation/types/MoreNavigator.types';

const More = () => {
  const { setOptions, navigate } = useNavigation<NMoreNavigatorNavigationProp<'Invite' | 'CustomerService'>>();

  useEffect(() => {
    setOptions({ headerTitle: moreEnum.More });
  }, [setOptions]);

  const renderItem = (icon: JSX.Element, text: string, additionalText: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <HStack space={4} py="8px" mb="20px">
        <View p="8px" backgroundColor={colors.red1} borderRadius={50}>
          {icon}
        </View>

        <VStack>
          <WhiteText>{text}</WhiteText>
          <Text color={colors.gray500}>{additionalText}</Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );

  return (
    <BlackContentWrapper>
      {renderItem(<CashbackIcon />, 'Invite friends', 'You card earn till 100$', () => navigate(moreEnum.Invite))}
      {renderItem(<PhoneIcon />, 'Customer service', 'We are online 24/7', () => navigate(moreEnum.CustomerService))}
    </BlackContentWrapper>
  );
};

export default More;
