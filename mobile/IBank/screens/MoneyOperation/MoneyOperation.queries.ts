import { gql } from '@apollo/client';

export const MONEY_SEND = gql`
  mutation moneySend($to: ObjectId!, $amount: Float!, $from: ObjectId) {
    moneySend(to: $to, amount: $amount, from: $from)
  }
`;
