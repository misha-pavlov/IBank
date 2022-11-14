import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const SendOnCardIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 16 16">
      <Path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" />
      <Path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-19 5.78c0-.431.349-.78.78-.78h.428v1.125h-1.208v-.345zm0 .764h1.208v.968h-1.208v-.968zm0 1.388h1.208v1.068h-.428c-.431 0-.78-.349-.78-.78v-.288zm3 5.068h-3v-1h3v1zm1-4.78c0 .431-.349.78-.78.78h-.429v-1.068h1.209v.288zm0-.708h-1.209v-.968h1.209v.968zm0-1.387h-1.629v2.875h-.743v-4h1.592c.431 0 .78.349.78.78v.345zm4 6.875h-3v-1h3v1zm1-6.5c0-1.381 1.119-2.5 2.5-2.5.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.327 1.571.857 2.123-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5zm4 6.5h-3v-1h3v1zm5 0h-3v-1h3v1zm-2.5-4c-1.38 0-2.5-1.119-2.5-2.5s1.12-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z" />
    </Svg>
  );
};

export default SendOnCardIcon;
