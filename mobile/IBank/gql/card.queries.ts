import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const GET_USER_CARDS = gql`
  query getUserCards($owner: String!) {
    getUserCards(owner: $owner) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
