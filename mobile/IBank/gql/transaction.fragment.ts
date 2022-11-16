import { gql } from '@apollo/client';

export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionFragment on Transaction {
    _id
    type
    title
    amount
    userId
    cardId
    createdAt
    isCanceled
    amountOnCardAfter
  }
`;
