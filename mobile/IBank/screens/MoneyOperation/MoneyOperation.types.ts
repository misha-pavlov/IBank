import { TCard } from '../../types/card';

export type MoneyOperationParams = {
  to?: TCard;
  from?: TCard;
  buttonText: string;
  headerTitle?: string;
  isFromMagicCard?: boolean;
  onComplete?: () => void;
};
