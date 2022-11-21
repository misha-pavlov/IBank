import { TCard } from '../../types/card';
import { TRANSACTION_TYPE_ENUM } from '../../types/transaction';

export type MoneyOperationParams = {
  buttonText: string;
  to?: TCard;
  from?: TCard;
  startValue?: number;
  sendOnNumber?: string;
  headerTitle?: string;
  isFromMagicCard?: boolean;
  type?: TRANSACTION_TYPE_ENUM;
  onUpdate?: () => void;
  onComplete?: () => void;
  getVariables?: (newValue: number) => Record<string, unknown>;
};
