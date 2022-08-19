import styled from 'styled-components/native';
import { colors } from '../../../../config/colors';

export const NextButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid ${colors.gray100};
  border-radius: 25px;
  width: 75%;
  max-width: 300px;
  margin-top: 50px;
  ${({ disabled }) => disabled && 'opacity: .5'}
`;

export const BackButtonText = styled.Text`
  color: ${colors.pinkA100};
  font-weight: 600;
`;

export const MoveToSignUpText = styled.Text`
  color: ${colors.pinkA100};
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
`;
