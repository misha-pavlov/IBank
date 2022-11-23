import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const CREATE_CARD = gql`
  mutation createCard(
    $pin: String!
    $owner: String!
    $ownerFullName: String!
    $isMasterCard: Boolean!
    $type: String!
  ) {
    createCard(pin: $pin, owner: $owner, ownerFullName: $ownerFullName, isMasterCard: $isMasterCard, type: $type) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ObjectId!
    $newPin: String
    $newType: String
    $newExpired: DateTime
    $newIsBlocked: Boolean
    $newCreditLimit: Float
    $newInternetLimit: Float
  ) {
    updateCard(
      cardId: $cardId
      newPin: $newPin
      newType: $newType
      newExpired: $newExpired
      newIsBlocked: $newIsBlocked
      newCreditLimit: $newCreditLimit
      newInternetLimit: $newInternetLimit
    ) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
