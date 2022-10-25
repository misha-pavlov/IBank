import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    GetUser {
      _id
      birthday
      fullName
      image
      phone
      pin
      sex
    }
  }
`;
