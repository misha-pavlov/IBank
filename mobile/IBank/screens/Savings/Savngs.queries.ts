import { gql } from '@apollo/client';

export const GET_USER_SAVINGS_SAVED_SUM = gql`
  query getUserSavingsSavedSum($owner: ObjectId!) {
    getUserSavingsSavedSum(owner: $owner)
  }
`;
