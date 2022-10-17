import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { colors } from '../../../../config/colors';

export const IconRoundBlock = styled.TouchableOpacity`
  background-color: ${colors.gray400_opacity35};
  border-radius: 50px;
  padding: 8px;
`;

export const ScrollBlock = styled(Animated.ScrollView)`
  width: 100%;
  z-index: 150;
  margin-top: 10px;
  position: absolute;
`;
