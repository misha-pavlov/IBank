import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CategoryIcon = ({ width, height, fill }: { width: number; height: number; fill: string }) => {
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2">
      <Path
        d="m11.3 13.7c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm10.7 0c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm0-8.7c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm-10.7 0c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1z"
        fillRule="nonzero"
      />
    </Svg>
  );
};

export default CategoryIcon;
