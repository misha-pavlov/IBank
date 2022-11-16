export enum TRANSACTION_TYPE_ENUM {
  TAXI = 'TAXI',
  CAR = 'CAR',
  CAFE = 'CAFE',
  PRODUCTS = 'PRODUCTS',
  TAXES = 'TAXES',
  FINES = 'FINES',
  CLOTHES = 'CLOTHES',
  TECHNOLOGIES = 'TECHNOLOGIES',
  REPAIRE = 'REPAIRE',
  INTERNET = 'INTERNET',
  MEDIC = 'MEDIC',
  CASH = 'CASH',
  TRAVELS = 'TRAVELS',
  MOBILE = 'MOBILE',
  MORE = 'MORE',
  PLAY = 'PLAY',
  CINEMA = 'CINEMA',
  DUTY_FREE = 'DUTY_FREE',
  ANIMALS = 'ANIMALS',
  BOOKS = 'BOOKS',
  CREDIT = 'CREDIT',
  FLOWERS = 'FLOWERS',
  INSURE = 'INSURE',
  ADV = 'ADV',
  MONEY_SEND = 'MONEY_SEND',
  SEND_ON_CARD = 'SEND_ON_CARD',
}

export type TTransaction = {
  _id: string;
  title: string;
  amount: number;
  cardId: string;
  userId: string;
  createdAt: string;
  isCanceled?: boolean;
  amountOnCardAfter: number;
  type: TRANSACTION_TYPE_ENUM;
};

export type GetCardTransactionsByDates = {
  total: number;
  categoriesCount: number;
  data: [TTransaction];
};
