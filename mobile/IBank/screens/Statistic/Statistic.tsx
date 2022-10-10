import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GradientCententWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import CardPicker from '../../components/CardPicker/CardPicker';
import CalendarPiker from './components/CalendarPiker/CalendarPiker';

const Statistic = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkBlue, shadowColor: colors.darkBlue } });
  }, [setOptions]);

  return (
    <GradientCententWrapper
      colors={[colors.darkBlue, colors.purple1, colors.purple1]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <WhiteText fontSize={20} fontWeight={600}>
        Statistic
      </WhiteText>

      {/* TODO: fix position in calendar piker bottom sheet */}
      <CalendarPiker />
      <CardPicker />
    </GradientCententWrapper>
  );
};

export default Statistic;
