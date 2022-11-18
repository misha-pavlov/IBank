import { TCard } from '../../types/card';
import { TRANSACTION_TYPE_ENUM } from '../../types/transaction';

export type MoneyOperationParams = {
  to?: TCard;
  from?: TCard;
  buttonText: string;
  sendOnNumber?: string;
  headerTitle?: string;
  isFromMagicCard?: boolean;
  type?: TRANSACTION_TYPE_ENUM;
  onComplete?: () => void;
};
