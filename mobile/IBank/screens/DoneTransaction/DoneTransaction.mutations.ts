import { gql } from '@apollo/client';

export const ADD_TO_SAVED_CARDS = gql`
  mutation addToSavedCards($userId: ObjectId!, $card: CardInput!) {
    addToSavedCards(userId: $userId, card: $card) {
      _id
    }
  }
`;
