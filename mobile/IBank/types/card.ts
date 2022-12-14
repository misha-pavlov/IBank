export enum CardType {
  BLACK = 'BLACK',
  IRON = 'IRON',
  PLATINUM = 'PLATINUM',
  SPECIAL = 'SPECIAL',
}

export type TCard = {
  _id: string;
  pin: string;
  cvv: string;
  type: CardType;
  owner: string;
  amount: number;
  number: string;
  expired: Date;
  isBlocked: boolean;
  creditLimit: number;
  ownerFullName: string;
  isMasterCard: boolean;
  internetLimit: number;
  payByPartsLimit: number;
  usedInternetLimit: number;
};
