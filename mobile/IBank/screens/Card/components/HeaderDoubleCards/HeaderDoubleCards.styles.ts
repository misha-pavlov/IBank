import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { colors } from '../../../../config/colors';

export const IconRoundBlock = styled.TouchableOpacity`
  background-color: ${colors.gray400_opacity35};
  border-radius: 50px;
  padding: 8px;
`;

export const ScrollBlock = styled(Animated.ScrollView)`
  /* strange flex value for changing size scrollable zone */
  flex: 0.135;
`;
