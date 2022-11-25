import { gql } from '@apollo/client';

export const WITHDRAW_PART = gql`
  mutation withdrawPart($savingId: ObjectId!, $to: ObjectId!, $amount: Float!) {
    withdrawPart(savingId: $savingId, to: $to, amount: $amount)
  }
`;
