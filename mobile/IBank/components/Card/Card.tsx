import React, { FC } from 'react';
import {
  BankName,
  BottomBlock,
  CardBlock,
  CardNumber,
  cardStyles,
  ExpiredDate,
} from './Card.styles';
import { constants } from '../../config/constants';
import MasterCard from '../../assets/svg/MasterCard';
import { TCard } from './Card.types';

const Card: FC<TCard> = ({ cardNumber, withFlip, expiredDate }) => {
  return (
    <CardBlock style={withFlip ? cardStyles.flip : cardStyles.empty}>
      <BankName>{constants.appName}</BankName>
      <CardNumber>{cardNumber}</CardNumber>

      <BottomBlock>
        <ExpiredDate>{expiredDate.toString()}</ExpiredDate>
        <MasterCard width={50} height={50} />
      </BottomBlock>
    </CardBlock>
  );
};

export default Card;
