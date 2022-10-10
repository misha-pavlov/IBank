import styled from 'styled-components/native';
import { View } from 'native-base';
import Animated from 'react-native-reanimated';
import { colors } from '../../config/colors';

export const CardCube = styled(View)<{ isSelectedCard?: boolean }>`
  padding: 10px;
  border-radius: 15px;
  border: 1px solid ${colors.gray100};
  ${({ isSelectedCard }) => isSelectedCard && `background-color: ${colors.gray100_opacity45}`}
`;

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
