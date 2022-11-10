import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const BlackButtonTouchable = styled.TouchableOpacity<{ isRed?: boolean; disabled?: boolean }>`
  background-color: ${({ isRed }) => (isRed ? colors.red : colors.gray900)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 12px 0;
  border-radius: 10px;
`;
