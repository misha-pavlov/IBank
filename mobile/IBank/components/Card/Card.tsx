import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { isFunction } from 'lodash';
import { View } from 'native-base';
import { BankName, BottomBlock, CardBlock, CardNumber, cardStyles, ExpiredDate } from './Card.styles';
import { constants } from '../../config/constants';
import { TCard } from './Card.types';
import { MasterCard, Visa } from '../../assets/svg';
import { CardType } from '../../types/card';
import { colors } from '../../config/colors';
import { WhiteText } from '../../common/common.styles';

const Card: FC<TCard> = ({ cardNumber, withFlip, expiredDate, withFullWidth, isMasterCard, type, onLongPress }) => {
  const [showBanner, setShowBanner] = useState(false);
  const isBlackCard = type === CardType.BLACK;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (showBanner) {
      timeout = setTimeout(() => setShowBanner(false), 1500);
    }

    return () => timeout && clearInterval(timeout);
  }, [showBanner]);

  return (
    <CardBlock
      type={type}
      disabled={!onLongPress}
      onLongPress={() => {
        if (isFunction(onLongPress)) {
          onLongPress();
        }

        setShowBanner(true);
      }}
      withFullWidth={withFullWidth}
      style={withFlip ? cardStyles.flip : cardStyles.empty}>
      <BankName useWhiteColor={isBlackCard}>{constants.appName}</BankName>
      <CardNumber withFullWidth={withFullWidth} isBlackCard={isBlackCard}>
        {cardNumber.replace(/(.{4})/g, '$1 ')}
      </CardNumber>

      <BottomBlock>
        <ExpiredDate isBlackCard={isBlackCard}>{moment(expiredDate).format('MM/YY')}</ExpiredDate>
        {isMasterCard ? <MasterCard width={50} height={50} /> : <Visa width={50} height={50} />}
      </BottomBlock>

      {showBanner && (
        <View
          top={0}
          left={0}
          right={0}
          height="30px"
          position="absolute"
          justifyContent="center"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          backgroundColor={colors.green1}
          w={withFullWidth ? '111%' : '300px'}>
          <WhiteText textAlign="center" fontWeight={500}>
            Coppied!
          </WhiteText>
        </View>
      )}
    </CardBlock>
  );
};

export default Card;
