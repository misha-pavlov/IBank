import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp($phone: String!, $pin: String!, $fullName: String!, $birthday: DateTime!, $sex: String!) {
    signUp(phone: $phone, pin: $pin, fullName: $fullName, birthday: $birthday, sex: $sex) {
      token
      newUserId
    }
  }
`;
