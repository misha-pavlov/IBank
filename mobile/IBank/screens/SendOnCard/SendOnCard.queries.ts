import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from '../../gql/card.fragment';

export const IS_CARD_EXIST = gql`
  query isCardExist($number: Float!) {
    isCardExist(number: $number) {
      ...CardFragment
    }
  }
  ${CARD_FRAGMENT}
`;
