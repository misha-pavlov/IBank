import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

const Savings = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      headerTitle: 'Savings',
      headerStyle: { backgroundColor: colors.blue, shadowColor: colors.blue },
    });
  }, [setOptions]);

  return (
    <BlackContentWrapper>
      <WhiteText>Savings</WhiteText>
    </BlackContentWrapper>
  );
};

export default Savings;
