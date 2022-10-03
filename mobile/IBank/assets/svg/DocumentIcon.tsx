import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DocumentIcon = ({ width, height, fill }: { width: number; height: number; fill: string }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M22 24h-20v-24h14l6 6v18zm-7-23h-12v22h18v-16h-6v-6zm3 15v1h-12v-1h12zm0-3v1h-12v-1h12zm0-3v1h-12v-1h12zm-2-4h4.586l-4.586-4.586v4.586z" />
    </Svg>
  );
};

export default DocumentIcon;
