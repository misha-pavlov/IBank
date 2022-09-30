import { View } from 'native-base';
import styled from 'styled-components/native';
import { colors } from './../../../../config/colors';

export const PinPoint = styled(View)<{ isSetPoint?: boolean }>`
  width: 15px;
  height: 15px;
  margin: 45px 15px;
  border-radius: 15px;
  background-color: ${({ isSetPoint }) => (isSetPoint ? colors.pinkA100 : colors.grey100)};
`;
