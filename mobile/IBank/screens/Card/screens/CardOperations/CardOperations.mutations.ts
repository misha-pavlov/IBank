import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../../../gql/card.fragment';

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ObjectId!
    $newPin: String
    $newType: String
    $newExpired: DateTime
    $newIsBlocked: Boolean
    $newInternetLimit: Float
  ) {
    updateCard(
      cardId: $cardId
      newPin: $newPin
      newType: $newType
      newExpired: $newExpired
      newIsBlocked: $newIsBlocked
      newInternetLimit: $newInternetLimit
    ) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
