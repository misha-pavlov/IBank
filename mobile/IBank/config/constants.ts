import { CardType } from '../types/card';

export const constants = {
  appName: 'IBank',

  keys: {
    USER_JWT: 'USER_JWT',
  },

  signUpStages: {
    // as for fix types
    phone: 'phone' as 'phone',
    pin: 'pin' as 'pin',
  },

  dateFormats: {
    D_MMMM_WithSpaces: 'D MMMM',
    D_MMMM_YYYY_WithSpaces: 'D MMMM YYYY',
  },

  card: {
    magicCard: 'Magic Card',
    typesRanks: [
      { type: CardType.BLACK, rank: 1 },
      { type: CardType.IRON, rank: 2 },
      { type: CardType.PLATINUM, rank: 3 },
    ],
  },

  saving: {
    newImageUrl: 'newImageUrl',
    newDescription: 'newDescription',
  },
};
