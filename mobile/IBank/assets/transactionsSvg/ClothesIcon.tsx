import React, { FC } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

// https://fontawesomeicons.com/svg/icons/shopping-bag-light
const ClothesIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 16 16">
      <Rect x="32" y="48" rx="8px" strokeLinecap="round" strokeLinejoin="round" />
      <Path strokeLinecap="round" strokeLinejoin="round" d="M168,88a40,40,0,0,1-80,0" />
    </Svg>
  );
};

export default ClothesIcon;
