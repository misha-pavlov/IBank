import { View } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { WhiteText } from '../../../../common/common.styles';
import { colors } from '../../../../config/colors';

type TPlate = {
  text: string;
  icon: JSX.Element;
  iconBackgroundColor: string;
  onPress: () => void;
};

const Plate: FC<TPlate> = ({ text, icon, iconBackgroundColor, onPress }) => {
  const { width } = useWindowDimensions();

  return (
    <View borderRadius={20} p="16px" w={width - 32} backgroundColor={colors.black2}>
      <TouchableOpacity onPress={onPress}>
        <View backgroundColor={iconBackgroundColor} alignSelf="flex-start" p="16px" borderRadius={50}>
          {icon}
        </View>
      </TouchableOpacity>

      <WhiteText fontSize={16} fontWeight={600} mt={25} pb={25}>
        {text}
      </WhiteText>
    </View>
  );
};

export default Plate;
