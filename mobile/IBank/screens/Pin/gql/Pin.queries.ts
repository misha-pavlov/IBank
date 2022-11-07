import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './../../../gql/card.fragment';

export const CHECK_USER_PIN = gql`
  query checkUserPin($userId: ObjectId!, $pin: String!) {
    checkUserPin(userId: $userId, pin: $pin)
  }
`;

export const GET_USER_FIRST_CARD = gql`
  query getUserFirstCard($owner: String!) {
    getUserFirstCard(owner: $owner) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
