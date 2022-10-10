import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from './../../config/colors';

export const DateTouchable = styled.TouchableOpacity`
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const s = StyleSheet.create({
  blur: {
    width: 21,
    height: 21,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 8,
  },
  gray100Color: {
    color: colors.gray100,
  },
  redBackground: {
    backgroundColor: colors.red,
  },
  backdropStyle: {
    backgroundColor: colors.black,
    height: 459,
  },
});
