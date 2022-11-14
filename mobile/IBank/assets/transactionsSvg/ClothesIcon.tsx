import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

// https://fontawesomeicons.com/svg/icons/bag-fill
const ClothesIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 16 16">
      <Path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
    </Svg>
  );
};

export default ClothesIcon;
