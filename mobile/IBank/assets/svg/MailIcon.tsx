import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MailIcon = ({ width, height, fill }: { width: number; height: number; fill: string }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
    </Svg>
  );
};

export default MailIcon;
