import { gql } from '@apollo/client';
import { SAVING_FRAGMENT } from './saving.fragment';

export const GET_SAVINGS_FOR_USER = gql`
  query getSavingsForUser($owner: ObjectId!) {
    getSavingsForUser(owner: $owner) {
      ...SavingFragment
    }
  }
  ${SAVING_FRAGMENT}
`;

export const GET_SAVING_BY_ID = gql`
  query getSavingById($savingId: ObjectId!) {
    getSavingById(savingId: $savingId) {
      ...SavingFragment
    }
  }
  ${SAVING_FRAGMENT}
`;

export const GET_USER_SAVINGS_SAVED_SUM = gql`
  query getUserSavingsSavedSum($owner: ObjectId!) {
    getUserSavingsSavedSum(owner: $owner)
  }
`;
