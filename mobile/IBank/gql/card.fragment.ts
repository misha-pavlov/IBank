import { gql } from '@apollo/client';

export const CARD_FRAGMENT = gql`
  fragment CardFragment on Card {
    _id
    pin
    type
    owner
    amount
    number
    expired
    isBlocked
    isMasterCard
    internetLimit
  }
`;
