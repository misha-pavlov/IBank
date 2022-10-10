import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../config/colors';

export const BlackContentWrapper = styled(View)`
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
});
