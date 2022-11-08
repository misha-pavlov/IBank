import React, { FC } from 'react';
import moment from 'moment';
import { BankName, BottomBlock, CardBlock, CardNumber, cardStyles, ExpiredDate } from './Card.styles';
import { constants } from '../../config/constants';
import { TCard } from './Card.types';
import { MasterCard, Visa } from '../../assets/svg';
import { CardType } from '../../types/card';

const Card: FC<TCard> = ({ cardNumber, withFlip, expiredDate, withFullWidth, isMasterCard, type }) => {
  const isBlackCard = type === CardType.BLACK;

  return (
    <CardBlock style={withFlip ? cardStyles.flip : cardStyles.empty} withFullWidth={withFullWidth} type={type}>
      <BankName useWhiteColor={isBlackCard}>{constants.appName}</BankName>
      <CardNumber withFullWidth={withFullWidth} isBlackCard={isBlackCard}>
        {cardNumber.replace(/(.{4})/g, '$1 ')}
      </CardNumber>

      <BottomBlock>
        <ExpiredDate isBlackCard={isBlackCard}>{moment(expiredDate).format('MM/YY')}</ExpiredDate>
        {isMasterCard ? <MasterCard width={50} height={50} /> : <Visa width={50} height={50} />}
      </BottomBlock>
    </CardBlock>
  );
};

export default Card;
