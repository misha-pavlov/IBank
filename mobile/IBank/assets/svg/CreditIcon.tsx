import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CreditIcon = ({ width, height, fill }: { width: number; height: number; fill: string }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M23.949 13c-.509 6.158-5.66 11-11.949 11-6.627 0-12-5.373-12-12 0-6.29 4.842-11.44 11-11.95v12.95h12.949zm-10.949-2h10.949c-.481-5.828-5.122-10.467-10.949-10.95v10.95z" />
    </Svg>
  );
};

export default CreditIcon;
