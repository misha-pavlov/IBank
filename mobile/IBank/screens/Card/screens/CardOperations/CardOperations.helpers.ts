import { constants } from '../../../../config/constants';
import { CardType } from '../../../../types/card';

export const getPossibleToUpdateCards = (currentCardType: CardType): Array<{ type: CardType; rank: number }> => {
  const currentCardRank = constants.card.typesRanks.filter(typeRank => typeRank.type === currentCardType && typeRank);

  return constants.card.typesRanks.filter(typeRank => {
    return typeRank.rank > currentCardRank[0].rank && typeRank;
  });
};
