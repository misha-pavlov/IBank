import React, { FC } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const BottleIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg
      width={width}
      height={height}
      strokeWidth="2"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M8 6h8v-2a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v2z" />
      <Path d="M16 6l1.094 1.759a6 6 0 0 1 .906 3.17v8.071a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8.071a6 6 0 0 1 .906 -3.17l1.094 -1.759" />
      <Circle cx="12" cy="16" r="2" />
      <Path d="M10 10h4" />
    </Svg>
  );
};

export default BottleIcon;
