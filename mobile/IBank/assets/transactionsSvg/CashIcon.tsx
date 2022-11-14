import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const CashIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M4 6v16h20v-16h-20zm10 13c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm.292-2.114v.614h-.584v-.582c-.603-.01-1.229-.154-1.75-.424l.266-.958c.558.216 1.3.445 1.881.315.671-.152.809-.842.068-1.175-.543-.251-2.205-.469-2.205-1.891 0-.795.605-1.508 1.74-1.663v-.622h.584v.593c.422.011.896.085 1.426.246l-.212.96c-.448-.156-.943-.3-1.425-.27-.868.051-.946.803-.339 1.118.998.469 2.301.818 2.301 2.068.001 1.002-.784 1.537-1.751 1.671zm6.708-12.886h-19v15h-2v-17h21v2z" />
    </Svg>
  );
};

export default CashIcon;
