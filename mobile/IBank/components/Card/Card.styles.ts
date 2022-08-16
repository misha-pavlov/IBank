import styled from 'styled-components/native';
import { colors } from '../../config/colors';
import { StyleSheet } from 'react-native';

export const CardBlock = styled.View`
  width: 300px;
  height: 175px;
  border-radius: 8px;
  background-color: ${colors.pinkA100};
  padding: 18px;
`;

export const BankName = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;

export const CardNumber = styled.Text`
  color: ${colors.black};
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
  padding-left: 3px;
`;

export const BottomBlock = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;

export const ExpiredDate = styled.Text`
  color: ${colors.black};
  font-size: 18px;
  margin-right: 15px;
`;

export const cardStyles = StyleSheet.create({
  flip: {
    transform: [{ rotate: '10deg' }],
  },
  empty: {},
});
