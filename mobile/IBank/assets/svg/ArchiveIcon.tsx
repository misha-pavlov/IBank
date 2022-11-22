import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const ArchiveIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M13.925 18.505c0 1.642-3.852 1.629-3.852.003 0-1.688 3.852-1.727 3.852-.003zm10.075-13.505v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-14 2h4v-1h-4v1zm0-2h4v-1h-4v1zm0-2h4v-1h-4v1zm0 6h4v-1h-4v1zm0 2h4v-1h-4v1zm5.118 6.786c-.388-1.994-1.117-5.786-1.117-5.786h-4s-.708 3.708-1.117 5.786c-.405 2.051 1.029 3.214 3.117 3.214 2.09 0 3.516-1.165 3.117-3.214z" />
    </Svg>
  );
};

export default ArchiveIcon;
