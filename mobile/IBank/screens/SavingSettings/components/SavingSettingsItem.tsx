import { HStack, Text, View, VStack } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../../common/common.styles';
import { colors } from '../../../config/colors';

type TSavingSettingsItem = {
  text: string;
  icon: JSX.Element;
  additionalText?: string;
  withRedBackground?: boolean;
  onPress: () => void;
};

const SavingSettingsItem: FC<TSavingSettingsItem> = ({ icon, text, additionalText, withRedBackground, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack space={4} alignItems="center">
        <View
          p="8px"
          borderRadius={50}
          alignItems="center"
          justifyContent="center"
          backgroundColor={withRedBackground ? colors.red1 : colors.pink}>
          {icon}
        </View>

        <VStack>
          <WhiteText fontSize={15}>{text}</WhiteText>
          {additionalText && <Text color={colors.gray600}>{additionalText}</Text>}
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default SavingSettingsItem;
