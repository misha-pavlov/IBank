import styled from 'styled-components/native';
import { colors } from '../../config/colors';

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
  color: ${colors.grey100};
`;
