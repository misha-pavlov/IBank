import { gql } from '@apollo/client';
import { TRANSACTION_FRAGMENT } from '../../../../gql/transaction.fragment';

export const GET_CARD_TRANSACTIONS = gql`
  query getCardTransactions($cardId: String!) {
    getCardTransactions(cardId: $cardId) {
      title
      data {
        ...TransactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`;
