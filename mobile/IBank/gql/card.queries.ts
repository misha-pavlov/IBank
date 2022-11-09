import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const GET_USER_CARDS = gql`
  query getUserCards($owner: String!, $excludeIds: [String!]!) {
    getUserCards(owner: $owner, excludeIds: $excludeIds) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
