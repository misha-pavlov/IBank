import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'native-base';
import { colors } from '../../../../../../config/colors';

export const SectionGradient = styled(LinearGradient)`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
`;

export const CardCube = styled(View)<{ isSelectedCard?: boolean }>`
  padding: 10px;
  border-radius: 15px;
  border: 1px solid ${colors.grey100};
  ${({ isSelectedCard }) => isSelectedCard && `background-color: ${colors.grey100_opacity45}`}
`;
