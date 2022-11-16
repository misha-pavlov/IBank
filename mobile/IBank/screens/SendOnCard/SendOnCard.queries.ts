import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../gql/card.fragment';

export const GET_USER_SAVED_CARDS = gql`
  query getUserSavedCards($userId: ObjectId!) {
    getUserSavedCards(userId: $userId) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
