import { ArrowForwardIcon, View } from 'native-base';
import React, { FC } from 'react';
import { getCardByType, getCardColorByType } from '../../../../../../helpers/cardHelpers';
import { useCurrentCard } from '../../../../../../hooks';
import { Touchable } from './MoveToCard.styles';

type TMoveToCard = {
  moveToNextScreen: () => void;
};

const MoveToCard: FC<TMoveToCard> = ({ moveToNextScreen }) => {
  const { currentCard } = useCurrentCard();

  return (
    <Touchable onPress={moveToNextScreen}>
      {getCardByType(currentCard.type)}

      <View>
        <ArrowForwardIcon color={getCardColorByType(currentCard.type)} ml="8px" />
      </View>
    </Touchable>
  );
};

export default MoveToCard;
