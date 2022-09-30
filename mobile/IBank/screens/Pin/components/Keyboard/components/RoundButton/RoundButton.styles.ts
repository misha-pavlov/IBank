import styled from 'styled-components/native';
import { colors } from '../../../../../../config/colors';

export const RoundTouchable = styled.TouchableOpacity<{
  isEmptyButton?: boolean;
  isRemoveButton?: boolean;
}>`
  border: 1px solid
    ${({ isEmptyButton, isRemoveButton }) => (isEmptyButton || isRemoveButton ? colors.black : colors.grey100)};
  padding: ${({ isRemoveButton }) => (isRemoveButton ? '15px 15px' : '15px 23px')};
  border-radius: 50px;
  margin-bottom: 25px;
  overflow: hidden;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
