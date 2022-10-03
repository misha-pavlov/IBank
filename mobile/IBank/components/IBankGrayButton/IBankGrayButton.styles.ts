import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const IBankGrayButtonTouchable = styled.TouchableOpacity<{ w?: number }>`
  background-color: ${colors.blueGray700};
  border-radius: 8px;
  width: ${({ w }) => w}px;
  padding: 5px;
  align-items: center;
`;
