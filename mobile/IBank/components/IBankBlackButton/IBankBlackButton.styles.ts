import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const BlackButtonTouchable = styled.TouchableOpacity<{ isRed?: boolean }>`
  background-color: ${({ isRed }) => (isRed ? colors.red : colors.gray900)};
  padding: 12px 0;
  border-radius: 10px;
`;
