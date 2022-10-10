import { Divider, Flex, Text, View } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

type TCardListtem = {
  type: string;
  amount: number;
  card: JSX.Element;
  onPress: () => void;
};

const CardListtem: FC<TCardListtem> = ({ card, type, amount, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Flex flexDirection="row">
          <View backgroundColor={colors.gray400} p="5px" borderRadius={50} mr="10px">
            {card}
          </View>

          <View>
            <WhiteText fontWeight={600}>{type}</WhiteText>
            <Text color={colors.blueGray200} fontSize={12}>
              {amount} $
            </Text>
          </View>
        </Flex>
      </TouchableOpacity>

      <Divider mt="15px" mb="20px" color={colors.gray100} />
    </>
  );
};

export default CardListtem;
