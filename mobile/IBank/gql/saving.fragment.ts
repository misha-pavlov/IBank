import { gql } from '@apollo/client';

export const SAVING_FRAGMENT = gql`
  fragment SavingFragment on Saving {
    _id
    name
    savingPoint
    saved
    owner
    description
    imageUrl
    savedFromCards {
      number
      amount
    }
  }
`;
