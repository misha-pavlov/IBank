import React, { FC } from 'react';
import { CardIcon } from '../assets/svg';
import { colors } from '../config/colors';

type TCard = {
  size?: number;
};

export const BlackCard: FC<TCard> = ({ size }) => (
  <CardIcon width={size || 32} height={size || 32} fill={colors.black} />
);
export const PinkCard: FC<TCard> = ({ size }) => (
  <CardIcon width={size || 32} height={size || 32} fill={colors.pink500} />
);
export const IronCard: FC<TCard> = ({ size }) => (
  <CardIcon width={size || 32} height={size || 32} fill={colors.blueGray500} />
);
