import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from './types';

const MasterCard: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg fill={fill} viewBox="0 0 50 50" width={width} height={height}>
      <Path d="M 16 9 C 7.178 9 9.9614761e-17 16.178 0 25 C 0 33.822 7.178 41 16 41 C 19.335259 41 22.433735 39.971623 25 38.21875 C 27.56594 39.970775 30.664249 41 34 41 C 42.824711 41 50 33.824711 50 25 C 50 16.175289 42.824711 9 34 9 C 30.664249 9 27.56594 10.029225 25 11.78125 C 22.433735 10.028377 19.335259 9 16 9 z M 34 11 C 41.743831 11 48 17.256169 48 25 C 48 32.743831 41.743831 39 34 39 C 31.299287 39 28.788886 38.225862 26.652344 36.90625 C 29.925796 33.974411 32 29.729602 32 25 C 32 20.270398 29.925796 16.025589 26.652344 13.09375 C 28.788886 11.774138 31.299287 11 34 11 z" />
    </Svg>
  );
};

export default MasterCard;
