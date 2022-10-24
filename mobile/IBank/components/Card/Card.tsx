import React, { FC } from 'react';
import { BankName, BottomBlock, CardBlock, CardNumber, cardStyles, ExpiredDate } from './Card.styles';
import { constants } from '../../config/constants';
import { TCard } from './Card.types';
import { MasterCard } from '../../assets/svg';

const Card: FC<TCard> = ({ cardNumber, withFlip, expiredDate, withFullWidth }) => {
  return (
    <CardBlock style={withFlip ? cardStyles.flip : cardStyles.empty} withFullWidth={withFullWidth}>
      <BankName>{constants.appName}</BankName>
      <CardNumber withFullWidth={withFullWidth}>{cardNumber}</CardNumber>

      <BottomBlock>
        <ExpiredDate>{expiredDate.toString()}</ExpiredDate>
        <MasterCard width={50} height={50} />
      </BottomBlock>
    </CardBlock>
  );
};

export default Card;
