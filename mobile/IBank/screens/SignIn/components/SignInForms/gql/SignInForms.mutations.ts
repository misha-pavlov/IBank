import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($phone: String!, $pin: String!) {
    signIn(phone: $phone, pin: $pin) {
      token
    }
  }
`;
