import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './card.fragment';

export const CREATE_CARD = gql`
  mutation createCard($pin: String!, $owner: String!, $isMasterCard: Boolean!, $type: String!) {
    createCard(pin: $pin, owner: $owner, isMasterCard: $isMasterCard, type: $type) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
