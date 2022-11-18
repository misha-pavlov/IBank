import { CardType } from './../../types/card';

export type TCard = {
  type: CardType;
  cardNumber: string;
  isMasterCard: boolean;
  expiredDate: Date | string;
  cvv?: string;
  withFlip?: boolean;
  withFullWidth?: boolean;
  onLongPress?: () => void;
};
