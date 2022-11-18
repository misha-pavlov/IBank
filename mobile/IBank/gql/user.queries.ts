import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const GET_USER = gql`
  query {
    getUser {
      _id
      sex
      pin
      image
      phone
      birthday
      fullName
      savedCards {
        ...CardFragment
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const GET_USER_SAVED_CARDS = gql`
  query getUserSavedCards($userId: ObjectId!, $searchTerm: String) {
    getUserSavedCards(userId: $userId, searchTerm: $searchTerm) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
