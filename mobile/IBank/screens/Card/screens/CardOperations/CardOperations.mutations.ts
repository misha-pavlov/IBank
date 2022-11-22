import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../../../gql/card.fragment';

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ObjectId!
    $newPin: String
    $newType: String
    $newExpired: DateTime
    $newInternetLimit: Float
  ) {
    updateCard(
      cardId: $cardId
      newPin: $newPin
      newType: $newType
      newExpired: $newExpired
      newInternetLimit: $newInternetLimit
    ) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
