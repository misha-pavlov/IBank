import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const CashbackIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z" />
    </Svg>
  );
};

export default CashbackIcon;
