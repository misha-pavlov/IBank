import { gql } from '@apollo/client';
import { TRANSACTION_FRAGMENT } from '../../../../gql/transaction.fragment';

export const GET_CARD_TRANSACTIONS = gql`
  query getCardTransactions($cardId: String!, $searchTerm: String) {
    getCardTransactions(cardId: $cardId, searchTerm: $searchTerm) {
      title
      data {
        ...TransactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`;
