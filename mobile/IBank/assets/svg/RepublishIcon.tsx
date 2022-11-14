import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const RepublishIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
      <Path d="M24 20h-21.888l2.885 2.247-.665.753-4.475-3.503 4.478-3.497.665.753-2.882 2.247h20.882v-11h1v12zm-2.118-16l-2.882-2.247.665-.753 4.478 3.497-4.475 3.503-.665-.753 2.885-2.247h-20.888v11.145h-1v-12.145h21.882z" />
    </Svg>
  );
};

export default RepublishIcon;
