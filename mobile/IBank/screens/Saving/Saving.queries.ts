import { gql } from '@apollo/client';
import { SAVING_FRAGMENT } from './../../gql/saving.fragment';

export const GET_SAVING_BY_ID = gql`
  query getSavingById($savingId: ObjectId!) {
    getSavingById(savingId: $savingId) {
      ...SavingFragment
    }
  }
  ${SAVING_FRAGMENT}
`;
