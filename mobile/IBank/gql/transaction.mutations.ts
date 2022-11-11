import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $type: String!
    $amount: Float!
    $title: String!
    $isCanceled: Boolean
    $amountOnCardAfter: Float!
  ) {
    moneySend(
      type: $type
      title: $title
      amount: $amount
      isCanceled: $isCanceled
      amountOnCardAfter: $amountOnCardAfter
    )
  }
`;
