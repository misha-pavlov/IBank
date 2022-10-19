import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from './types';

const CheckoutIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M10.81 11.885h-1.098l.066-.739h1.069l-.037.739zm.613 1.099h1.14l-.007-.739h-1.111l-.022.739zm.085-2.971l-.021.739h1.054l-.007-.739h-1.026zm-1.894 2.971h1.14l.038-.739h-1.112l-.066.739zm1.291-2.971h-1.026l-.066.739h1.054l.038-.739zm6.308 0l.137.739h1.054l-.165-.739h-1.026zm-4.115 0l.023.739h1.054l-.051-.739h-1.026zm1.155 1.872l-.051-.739h-1.069l.022.739h1.098zm3.309-4.885h-7.406l-.204 2h8.058l-.448-2zm-6.107 4.885h1.097l-.007-.739h-1.069l-.021.739zm2.874 1.099l-.051-.739h-1.111l.023.739h1.139zm-5.888-2.971h-1.025l-.134.739h1.054l.105-.739zm10.215 1.872l-.165-.739h-1.069l.136.739h1.098zm-12.074-.739h-1.069l-.179.739h1.097l.151-.739zm.231-1.133h-1.026l-.179.739h1.054l.151-.739zm17.187 4.987v7h-24v-7h24zm-2 2h-20v3h20v-3zm-9 1h-2v1h2v-1zm-7.932-5.016h1.14l.15-.739h-1.111l-.179.739zm11.702-2.233l-.121-.739h-1.026l.093.739h1.054zm.185 1.134l-.121-.739h-1.069l.093.739h1.097zm1.946 1.099l-.165-.739h-2.833l.093.739h2.905zm-10.622-1.838h-1.069l-.134.739h1.098l.105-.739zm-1.402 1.838h1.139l.105-.739h-1.11l-.134.739zm-5.595.016l2.621-9h1.921c.112-.622.322-1.371.668-2h3.427c-.26.57-.499 1.259-.627 2h10.805l2.592 9h-2.221l-1.804-7h-9.42c.071.836.178 1.511-.107 2h-3.456c.292-.431.166-1.111.086-2h-.481l-1.739 7h-2.265zm5.101-6.631h2.298c-.157-1.076-.092-2.782.404-3.786h-2.249c-.553 1.006-.624 2.64-.453 3.786z" />
    </Svg>
  );
};

export default CheckoutIcon;
