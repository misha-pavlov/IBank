import { ArrowForwardIcon, View } from 'native-base';
import React, { FC } from 'react';
import { BlackCard } from '../../../../../../common/cards';
import { colors } from '../../../../../../config/colors';
import { Touchable } from './MoveToCard.styles';

type TMoveToCard = {
  moveToNextScreen: () => void;
};

const MoveToCard: FC<TMoveToCard> = ({ moveToNextScreen }) => {
  return (
    <Touchable onPress={moveToNextScreen}>
      <BlackCard />

      <View>
        <ArrowForwardIcon color={colors.black} ml="8px" />
      </View>
    </Touchable>
  );
};

export default MoveToCard;
