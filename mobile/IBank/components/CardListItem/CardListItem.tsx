import { Divider, Flex, Text, View } from 'native-base';
import React, { FC, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

type TCardListItem = {
  type: string;
  text?: string;
  amount: number;
  card: JSX.Element;
  onPress: () => void;
};

const CardListItem: FC<TCardListItem> = ({ card, type, text, amount, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Flex flexDirection="row">
          <View backgroundColor={colors.gray400} p="5px" borderRadius={50} mr="10px">
            {card}
          </View>

          <View justifyContent="center">
            <WhiteText fontWeight={600}>{text || type}</WhiteText>
            {amount && (
              <Text color={colors.blueGray200} fontSize={12}>
                {amount} $
              </Text>
            )}
          </View>
        </Flex>
      </TouchableOpacity>

      <Divider mt="10px" mb="10px" h={0} color={colors.gray100} />
    </>
  );
};

export default memo(CardListItem);
