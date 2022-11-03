import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../config/colors';

export const BlackContentWrapper = styled(View)<{ withoutPadding?: boolean }>`
  flex: 1;
  background-color: ${colors.black};
  padding: ${({ withoutPadding }) => (withoutPadding ? 0 : 16)}px;
`;

export const ScrollableBlackContentWrapper = styled(ScrollView)`
  flex: 1;
  background-color: ${colors.black};
  padding: 16px;
`;

export const GradientCententWrapper = styled(LinearGradient)`
  flex: 1;
  background-color: ${colors.black};
  padding: 16px;
`;

export const WhiteText = styled(Text)`
  color: ${colors.gray100};
`;

export const BankNameHeader = styled.Text`
  color: ${colors.gray100};
  font-size: 18px;
  font-weight: 600;
`;

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

export const SectionGradient = styled(LinearGradient)<{ withoutBorderRadius?: boolean }>`
  width: 100%;
  padding: 16px;
  border-radius: ${({ withoutBorderRadius }) => (withoutBorderRadius ? 0 : 8)}px;
`;

export const TransparentBox = styled(View)<{ p?: number }>`
  background-color: ${colors.transparent};
  padding: ${({ p }) => p || 16}px;
  border-radius: 10px;
`;

export const CardCube = styled(View)<{ isSelectedCard?: boolean }>`
  padding: 10px;
  border-radius: 15px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.gray400_opacity25};
  ${({ isSelectedCard }) => isSelectedCard && `background-color: ${colors.gray400}`}
`;

export const commonStyles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  blackBackground: {
    backgroundColor: colors.black,
  },
  gray100Backround: {
    backgroundColor: colors.gray100,
  },
  container16: {
    paddingHorizontal: 16,
  },
});
