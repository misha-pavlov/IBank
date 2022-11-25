import { gql } from '@apollo/client';

export const WITHDRAW_PART = gql`
  mutation withdrawPart($savingId: ObjectId!, $to: ObjectId!, $amount: Float!) {
    withdrawPart(savingId: $savingId, to: $to, amount: $amount)
  }
`;

export const BREAK_SAVING = gql`
  mutation breakSaving($savingId: ObjectId!, $to: ObjectId!) {
    breakSaving(savingId: $savingId, to: $to)
  }
`;
