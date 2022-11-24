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
