import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const FlowersIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} fillRule="evenodd" clipRule="evenodd" viewBox="0 0 16 16">
      <Path d="M1 15c4.075-1.121 9.51.505 11 6 1.985-5.939 7.953-7.051 11-6-2.467 1.524-3.497 9-11 9s-8.487-7.471-11-9zm8.203-12.081c.008-1.612 1.319-2.919 2.933-2.919 1.615 0 2.926 1.307 2.934 2.919 1.4-.799 3.187-.317 3.995 1.081.807 1.398.331 3.187-1.062 4 1.393.813 1.869 2.602 1.062 4-.808 1.398-2.595 1.88-3.995 1.081-.008 1.612-1.319 2.919-2.934 2.919-1.614 0-2.925-1.307-2.933-2.919-1.4.799-3.188.317-3.995-1.081-.807-1.398-.331-3.187 1.062-4-1.393-.813-1.869-2.602-1.062-4 .807-1.398 2.595-1.88 3.995-1.081zm2.797 2.581c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" />
    </Svg>
  );
};

export default FlowersIcon;
