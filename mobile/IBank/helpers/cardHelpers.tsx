import React from 'react';
import { BlackCard, IronCard, PinkCard, SpecialCard } from '../common/cards';
import { colors } from '../config/colors';
import { CardType } from '../types/card';

export const getCardByType = (type: CardType, size?: number) => {
  switch (type) {
    case CardType.IRON:
      return <IronCard size={size} />;

    case CardType.PLATINUM:
      return <PinkCard size={size} />;

    case CardType.SPECIAL:
      return <SpecialCard size={size} />;

    default:
      return <BlackCard size={size} />;
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
