import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../config/colors';
import { TIcon } from '../svgTypes';

const InsureIcon: FC<TIcon> = ({ width = 24, height = 24, fill = colors.gray100 }) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <Path d="M12 6c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm2.656 1.999c.121.108.237.223.344.344l-.582.583-.166-.178-.179-.166.583-.583zm-1.326-.78c.154.054.305.117.449.189l-.322.76-.26-.12-.187-.069.32-.76zm-1.573-.219h.486v.824l-.243-.009-.243.009v-.824zm-1.063.209l.315.762-.207.076-.242.11-.314-.762c.144-.07.295-.132.448-.186zm-2.286 2.012l.76.32-.119.26-.07.188-.76-.32c.054-.155.117-.304.189-.448zm-.408 1.534h.824l-.009.243.009.243h-.824v-.486zm.396 1.997c-.07-.145-.133-.295-.187-.45l.763-.315.076.208.109.24-.761.317zm.879 1.314l-.344-.343.65-.652.166.178.179.166-.651.651zm.473-5.318l-.166.178-.582-.583c.107-.121.223-.236.344-.344l.583.583-.179.166zm.922 6.033c-.154-.054-.305-.117-.449-.189l.322-.76.26.12.188.07-.321.759zm1.573.219h-.486v-.825l.243.009.243-.009v.825zm1.062-.21l-.314-.763.207-.076.242-.11.314.762c-.144.071-.295.134-.449.187zm-1.305-1.79c-1.105 0-2-.895-2-2 0-.407.121-.784.329-1.1l.724.724.522-.522-.731-.733c.326-.232.724-.369 1.156-.369 1.105 0 2 .896 2 2s-.895 2-2 2zm2.656.997l-.583-.583.179-.166.166-.178.582.583c-.107.122-.223.237-.344.344zm.936-1.221l-.76-.321.119-.259.07-.189.76.321c-.054.153-.117.304-.189.448zm.408-1.535h-.824l.009-.243-.009-.243h.824v.486zm-.21-1.548l-.763.315-.076-.208-.109-.242.762-.314c.07.145.132.296.186.449zm.21 12.307h5v2h-5v-2zm-13 0h5v2h-5v-2zm-2-22v21h22v-21h-22zm11 17c-3.316 0-6-2.684-6-6 0-3.317 2.684-6 6-6s6 2.684 6 6-2.684 6-6 6z" />
    </Svg>
  );
};

export default InsureIcon;
