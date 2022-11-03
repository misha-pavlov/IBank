export enum CardType {
  BLACK = 'BLACK',
  IRON = 'IRON',
  PLATINUM = 'PLATINUM',
}

export type TCard = {
  _id: string;
  pin: string;
  type: CardType;
  owner: string;
  amount: number;
  number: string;
  expired: Date;
  isBlocked: boolean;
  isMasterCard: boolean;
  internetLimit: number;
};
