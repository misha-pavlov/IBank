import styled from 'styled-components/native';
import { colors } from '../../../../../../config/colors';

export const RoundTouchable = styled.TouchableOpacity<{
  isEmptyButton?: boolean;
}>`
  border: 1px solid
    ${({ isEmptyButton }) => (isEmptyButton ? colors.black : colors.gray100)};
  padding: 15px 23px;
  border-radius: 50px;
  margin-bottom: 25px;
`;
