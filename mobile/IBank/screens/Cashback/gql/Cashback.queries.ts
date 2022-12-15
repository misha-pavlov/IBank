import { gql } from '@apollo/client';

export const GET_CASHBACKS = gql`
  query getCashbacks {
    getCashbacks {
      _id
      image
      title
      percent
      connectedInUsers
    }
  }
`;
