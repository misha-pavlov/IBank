import { gql } from '@apollo/client';

export const CARD_FRAGMENT = gql`
  fragment CardFragment on Card {
    _id
    pin
    cvv
    type
    owner
    amount
    number
    expired
    isBlocked
    creditLimit
    isMasterCard
    ownerFullName
    internetLimit
    usedInternetLimit
  }
`;
