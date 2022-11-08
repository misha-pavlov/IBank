import { gql } from '@apollo/client';

export const GET_USER_CAPITAL = gql`
  query getUserCapital($owner: String!) {
    getUserCapital(owner: $owner)
  }
`;
