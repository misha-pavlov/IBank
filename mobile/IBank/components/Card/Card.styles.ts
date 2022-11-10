import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';
import { getCardColorByType } from '../../helpers/cardHelpers';
import { CardType } from './../../types/card';

export const CardBlock = styled.View<{ withFullWidth?: boolean; type: CardType }>`
  width: ${({ withFullWidth }) => (withFullWidth ? '100%' : '300px')};
  height: ${({ withFullWidth }) => (withFullWidth ? 220 : 185)}px;
  border-radius: 20px;
  background-color: ${({ type }) => getCardColorByType(type)};
  padding: 18px;
`;

export const BankName = styled.Text<{ useWhiteColor?: boolean }>`
  color: ${({ useWhiteColor }) => (useWhiteColor ? colors.gray100 : colors.black)};
  font-weight: 600;
  font-size: 18px;
`;

export const CardNumber = styled.Text<{ withFullWidth?: boolean; isBlackCard: boolean }>`
  color: ${({ isBlackCard }) => (isBlackCard ? colors.gray100 : colors.black)};
  margin-top: ${({ withFullWidth }) => (withFullWidth ? 50 : 20)}px;
  font-size: 25px;
  font-weight: 700;
  padding-left: 3px;
  letter-spacing: ${({ withFullWidth }) => (withFullWidth ? 1.5 : -0.8)}px;
`;

export const BottomBlock = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;

export const ExpiredDate = styled.Text<{ isBlackCard: boolean }>`
  color: ${({ isBlackCard }) => (isBlackCard ? colors.gray100 : colors.black)};
  font-size: 18px;
  margin-right: 15px;
  margin-bottom: 25px;
`;

export const cardStyles = StyleSheet.create({
  flip: {
    transform: [{ rotate: '10deg' }],
  },
  empty: {},
});
