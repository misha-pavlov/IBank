import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../gql/card.fragment';

export const GET_USER_SAVED_CARDS = gql`
  query getUserSavedCards($userId: ObjectId!, $searchTerm: String) {
    getUserSavedCards(userId: $userId, searchTerm: $searchTerm) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;

export const IS_CARD_EXIST = gql`
  query isCardExist($number: Float!) {
    isCardExist(number: $number) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
