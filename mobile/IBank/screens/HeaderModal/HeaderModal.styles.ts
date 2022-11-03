import styled from 'styled-components/native';
import { View } from 'native-base';
import Animated from 'react-native-reanimated';

export const BottomBottomScrollableBlock = styled(View)`
  height: 65px;
  position: absolute;
  width: 100%;
  left: 16px;
  bottom: 0;
`;

export const ScrollBlock = styled(Animated.ScrollView)`
  flex: 1;
`;
