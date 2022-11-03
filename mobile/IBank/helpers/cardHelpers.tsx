import React from 'react';
import { BlackCard, IronCard, PinkCard } from '../common/cards';
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
