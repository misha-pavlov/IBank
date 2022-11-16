import { gql } from '@apollo/client';
import { TRANSACTION_FRAGMENT } from '../../../../gql/transaction.fragment';

export const GET_CARD_TRANSACTIONS_BY_DATES = gql`
  query getCardTransactionsByDates($cardId: String!, $startDate: DateTime!, $endDate: DateTime!) {
    getCardTransactionsByDates(cardId: $cardId, startDate: $startDate, endDate: $endDate) {
      total
      categoriesCount
      data {
        ...TransactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`;
