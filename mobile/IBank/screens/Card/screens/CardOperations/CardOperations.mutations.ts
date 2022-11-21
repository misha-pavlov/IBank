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
