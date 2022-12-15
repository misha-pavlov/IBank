import { gql } from '@apollo/client';

export const SWITCH_CASHBACK = gql`
  mutation switchCashback($userId: ObjectId!, $cashbackId: ObjectId!) {
    switchCashback(userId: $userId, cashbackId: $cashbackId)
  }
`;
