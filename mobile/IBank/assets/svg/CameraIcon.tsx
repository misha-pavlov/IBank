import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const CameraIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24">
      <Path d="M16.983 2l1.406 2.109c.371.557.995.891 1.664.891h3.93v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8zm3.07 4c-1.006 0-1.938-.5-2.496-1.337l-1.109-1.663h-6.93l-1.109 1.664c-.557.836-1.49 1.336-2.496 1.336h-4.93v15h22v-15h-2.93zm-7.053 1c3.311 0 6 2.689 6 6s-2.689 6-6 6-6-2.689-6-6 2.689-6 6-6zm0 1c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-8-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm-3-6h3.001v1h-3.001v-1z" />
    </Svg>
  );
};

export default CameraIcon;
