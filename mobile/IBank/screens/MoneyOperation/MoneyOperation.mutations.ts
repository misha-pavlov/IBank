import { gql } from '@apollo/client';

export const MONEY_SEND = gql`
  mutation moneySend(
    $amount: Float!
    $from: ObjectId
    $sendOnNumber: String
    $to: ObjectId
    $type: String
    $sendOnSaving: ObjectId
  ) {
    moneySend(
      amount: $amount
      to: $to
      from: $from
      sendOnNumber: $sendOnNumber
      type: $type
      sendOnSaving: $sendOnSaving
    )
  }
`;
