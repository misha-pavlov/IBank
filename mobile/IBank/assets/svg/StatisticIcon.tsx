import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const StatisticIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 24 24">
      <Path d="M0 22h1v-5h4v5h2v-10h4v10h2v-15h4v15h2v-21h4v21h1v1h-24v-1zm4-4h-2v4h2v-4zm6-5h-2v9h2v-9zm6-5h-2v14h2v-14zm6-6h-2v20h2v-20z" />
    </Svg>
  );
};

export default StatisticIcon;
