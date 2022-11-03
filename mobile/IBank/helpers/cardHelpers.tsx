import React from 'react';
import { BlackCard, IronCard, PinkCard } from '../common/cards';
import { colors } from '../config/colors';
import { CardType } from '../types/card';

export const getCardByType = (type: CardType) => {
  switch (type) {
    case CardType.IRON:
      return <IronCard />;

    case CardType.PLATINUM:
      return <PinkCard />;

    default:
      return <BlackCard />;
  }
};

export const getCardColorByType = (type: CardType) => {
  switch (type) {
    case CardType.IRON:
      return colors.blueGray500;

    case CardType.PLATINUM:
      return colors.pink500;

    default:
      return colors.black;
  }
};
