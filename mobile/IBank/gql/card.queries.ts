import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const GET_USER_CARDS = gql`
  query getUserCards($owner: String!, $excludeIds: [String!]) {
    getUserCards(owner: $owner, excludeIds: $excludeIds) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;

export const GET_CARD_BY_ID = gql`
  query getCardById($_id: ObjectId!) {
    getCardById(_id: $_id) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
