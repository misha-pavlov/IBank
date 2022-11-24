import { gql } from '@apollo/client';
import { SAVING_FRAGMENT } from '../../gql/saving.fragment';

export const CREATE_SAVING = gql`
  mutation createSaving($savingPoint: Float!, $name: String!, $owner: ObjectId!) {
    createSaving(savingPoint: $savingPoint, name: $name, owner: $owner) {
      ...SavingFragment
    }
  }
  ${SAVING_FRAGMENT}
`;
