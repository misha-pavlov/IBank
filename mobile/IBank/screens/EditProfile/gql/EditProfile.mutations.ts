import { gql } from '@apollo/client';

export const EDIT_PROFILE = gql`
  mutation editProfile($userId: ObjectId!, $fullName: String!, $phone: String!, $birthday: DateTime!) {
    editProfile(userId: $userId, fullName: $fullName, phone: $phone, birthday: $birthday) {
      _id
    }
  }
`;
