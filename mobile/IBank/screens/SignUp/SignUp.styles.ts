import styled from 'styled-components/native';
import { colors } from '../../config/colors';

export const BankNameHeader = styled.Text`
  color: ${colors.gray100};
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderBlock = styled.View`
  margin-top: 40px;
  margin-bottom: 75px;
  align-items: center;
`;

export const BestCardText = styled.Text<{ withMargin?: boolean }>`
  margin-top: ${({ withMargin }) => (withMargin ? 75 : 0)}px;
  font-weight: ${({ withMargin }) => (withMargin ? 400 : 600)};
  font-size: 20px;
  text-align: center;
  color: ${colors.gray100};
`;
