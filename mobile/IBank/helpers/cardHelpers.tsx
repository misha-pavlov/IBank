import React from 'react';
import { BlackCard } from '../common/cards';
import { CardType } from '../types/card';

export const getCardByType = (type: CardType) => {
  switch (type) {
    case CardType.IRON:
      return <BlackCard />;

    case CardType.PLATINUM:
      return <BlackCard />;

    default:
      return <BlackCard />;
  }
};
