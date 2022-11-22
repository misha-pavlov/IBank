import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../../../gql/card.fragment';

export const UPDATE_INTERNET_LIMIT = gql`
  mutation updateInternetLimit($cardId: ObjectId!, $newInternetLimit: Float!) {
    updateInternetLimit(cardId: $cardId, newInternetLimit: $newInternetLimit) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;

export const UPDATE_CARD_TYPE = gql`
  mutation updateCardType($cardId: ObjectId!, $newType: String!) {
    updateCardType(cardId: $cardId, newType: $newType) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
