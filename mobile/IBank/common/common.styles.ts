import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { colors } from '../config/colors';

export const BlackContentWrapper = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 16px;
`;

export const WhiteText = styled.Text`
  color: ${colors.gray100};
`;

export const commonStyles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
});
