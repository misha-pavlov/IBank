import { gql } from '@apollo/client';

export const CHECK_USER_PIN = gql`
  query checkUserPin($userId: ObjectId!, $pin: String!) {
    checkUserPin(userId: $userId, pin: $pin)
  }
`;
