import React from 'react';
import { Text } from 'react-native';
import { BlackContentWrapper } from '../../common/common.styles';
import HeaderDoubleCards from './components/HeaderDoubleCards/HeaderDoubleCards';

const Card = () => {
  return (
    <BlackContentWrapper>
      <HeaderDoubleCards />
      <Text>Card</Text>
    </BlackContentWrapper>
  );
};

export default Card;
