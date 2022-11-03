import React, { FC } from 'react';
import { BankName, BottomBlock, CardBlock, CardNumber, cardStyles, ExpiredDate } from './Card.styles';
import { constants } from '../../config/constants';
import { TCard } from './Card.types';
import { MasterCard, Visa } from '../../assets/svg';
import moment from 'moment';

const Card: FC<TCard> = ({ cardNumber, withFlip, expiredDate, withFullWidth, isMasterCard, type }) => {
  return (
    <CardBlock style={withFlip ? cardStyles.flip : cardStyles.empty} withFullWidth={withFullWidth} type={type}>
      <BankName>{constants.appName}</BankName>
      <CardNumber withFullWidth={withFullWidth}>{cardNumber.replace(/(.{4})/g, '$1 ')}</CardNumber>

      <BottomBlock>
        <ExpiredDate>{moment(expiredDate).format('MM/YY')}</ExpiredDate>
        {isMasterCard ? <MasterCard width={50} height={50} /> : <Visa width={50} height={50} />}
      </BottomBlock>
    </CardBlock>
  );
};

export default Card;
