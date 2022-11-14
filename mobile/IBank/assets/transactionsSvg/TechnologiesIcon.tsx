import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

// https://fontawesomeicons.com/svg/icons/washing-machine
const TechnologiesIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path
        d="M20.9999 3.99999L21 20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H18.9999C20.1045 2 20.9999 2.89543 20.9999 3.99999Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M18 5.01L18.01 4.99889" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M12 19C15.3137 19 18 16.3137 18 13C18 9.68629 15.3137 7 12 7C8.68629 7 6 9.68629 6 13C6 16.3137 8.68629 19 12 19Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 16C10.3431 16 9 14.6569 9 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default TechnologiesIcon;
