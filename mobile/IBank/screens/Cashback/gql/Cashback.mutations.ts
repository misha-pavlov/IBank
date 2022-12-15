import { gql } from '@apollo/client';

export const SWITCH_CASHBACK = gql`
  mutation switchCashback($userId: ObjectId!, $cashbackId: ObjectId!) {
    switchCashback(userId: $userId, cashbackId: $cashbackId)
  }
`;

export const WITHDRAW_CASHBACK = gql`
  mutation withdrawCashback($userId: ObjectId!, $cardId: ObjectId!, $amount: Float!) {
    withdrawCashback(userId: $userId, cardId: $cardId, amount: $amount)
  }
`;
