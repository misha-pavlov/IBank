import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const BlockCardIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24">
      <Path
        d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm-6.515 4.544c-1.237 1.476-1.983 3.378-1.983 5.454 0 4.69 3.808 8.497 8.498 8.497 2.075 0 3.977-.745 5.454-1.983zm13.029 10.908c1.238-1.477 1.983-3.379 1.983-5.454 0-4.69-3.807-8.498-8.497-8.498-2.076 0-3.978.746-5.454 1.983z"
        fillRule="nonzero"
      />
    </Svg>
  );
};

export default BlockCardIcon;
