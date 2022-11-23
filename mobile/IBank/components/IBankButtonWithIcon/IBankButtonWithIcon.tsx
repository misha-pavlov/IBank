import { HStack, View } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

type TIBankButtonWithIcon = {
  text: string;
  icon: JSX.Element;
  backgroundColor: string;
  onPress: () => void;
};

const IBankButtonWithIcon: FC<TIBankButtonWithIcon> = ({ text, icon, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack space={4} backgroundColor={colors.black2} p="12px" borderRadius={20} alignItems="center">
        <View backgroundColor={backgroundColor} padding="8px" borderRadius={50}>
          {icon}
        </View>
        <WhiteText fontSize={16} fontWeight={500}>
          {text}
        </WhiteText>
      </HStack>
    </TouchableOpacity>
  );
};

export default IBankButtonWithIcon;
