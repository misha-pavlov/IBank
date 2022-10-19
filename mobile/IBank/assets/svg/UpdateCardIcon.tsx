import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from './types';

const UpdateCardIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm0-22c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm2 14h-4v-1h4v1zm0 1v1h-4v-1h4zm-4-6h-4l6-6 6 6h-4v3h-4v-3z" />
    </Svg>
  );
};

export default UpdateCardIcon;
