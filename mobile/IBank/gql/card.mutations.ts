import { gql } from '@apollo/client';

export const CREATE_CARD = gql`
  mutation createCard($pin: String!, $owner: String!, $isMasterCard: Boolean!, $type: String!) {
    createCard(pin: $pin, owner: $owner, isMasterCard: $isMasterCard, type: $type) {
      _id
      type
      number
      expired
      isMasterCard
    }
  }
`;
