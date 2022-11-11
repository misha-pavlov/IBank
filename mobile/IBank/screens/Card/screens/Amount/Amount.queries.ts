import { gql } from '@apollo/client';

export const GET_CARD_TRANSACTIONS = gql`
  query getCardTransactions($cardId: String!) {
    getCardTransactions(cardId: $cardId) {
      title
      data {
        _id
        type
        title
        amount
        userId
        cardId
        createdAt
        isCanceled
        amountOnCardAfter
      }
    }
  }
`;
