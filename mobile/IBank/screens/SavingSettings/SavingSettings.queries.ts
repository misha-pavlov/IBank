import { gql } from '@apollo/client';
import { SAVING_FRAGMENT } from './../../gql/saving.fragment';

export const UPDATE_SAVING = gql`
  mutation updateSaving(
    $savingId: ObjectId!
    $newDescription: String
    $newImageUrl: String
    $newName: String
    $newSavingPoint: Float
  ) {
    updateSaving(
      savingId: $savingId
      newDescription: $newDescription
      newImageUrl: $newImageUrl
      newName: $newName
      newSavingPoint: $newSavingPoint
    ) {
      ...SavingFragment
    }
  }
  ${SAVING_FRAGMENT}
`;
