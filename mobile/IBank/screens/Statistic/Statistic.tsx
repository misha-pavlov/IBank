import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DateRangePicker from 'react-native-daterange-picker';
import { BlurView } from '@react-native-community/blur';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { useWindowDimensions } from 'react-native';
import CalendarIcon from '../../assets/svg/CalendarIcon';
import { GradientCententWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { constants } from '../../config/constants';
import { DateTouchable, s } from './Statistic.styles';

type TDates = {
  endDate?: moment.Moment;
  startDate?: moment.Moment;
  displayedDate?: moment.Moment;
};

const Statistic = () => {
  const { setOptions } = useNavigation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkBlue, shadowColor: colors.darkBlue } });
  }, [setOptions]);

  const [endDate, setEndDate] = useState(moment());
  const [displayedDate, setDisplayedDate] = useState(moment());

  const currentMonth = moment().format('M');
  const currentYear = moment().format('Y');

  const [startDate, setStartDate] = useState(moment(`${currentYear}-${currentMonth}-01`));

  const isEquelDateYears = useMemo(() => startDate.format('Y') === endDate.format('Y'), [endDate, startDate]);

  const startDateFormat = useMemo(() => {
    if (isEquelDateYears) {
      return constants.dateFormats.D_MMMM_WithSpaces;
    }

    return constants.dateFormats.D_MMMM_YYYY_WithSpaces;
  }, [isEquelDateYears]);

  const setDates = (dates: TDates) => {
    if (dates.startDate !== undefined) {
      setStartDate(dates.startDate);
    }

    if (dates.displayedDate !== undefined) {
      setDisplayedDate(dates.displayedDate);
    }

    if (dates.endDate !== undefined) {
      setEndDate(dates.endDate);
    }
  };

  // Bottom sheet link: https://gorhom.github.io/react-native-bottom-sheet/
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <GradientCententWrapper
      colors={[colors.darkBlue, colors.purple1, colors.purple1]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <WhiteText fontSize={20} fontWeight={600}>
        Statistic
      </WhiteText>

      <DateTouchable onPress={() => bottomSheetRef.current?.expand()}>
        <WhiteText>{startDate.format(startDateFormat)} - </WhiteText>
        <WhiteText>{endDate.format(constants.dateFormats.D_MMMM_YYYY_WithSpaces)}</WhiteText>

        <BlurView blurType="light" style={s.blur}>
          <CalendarIcon width={11} height={11} fill={colors.gray100} />
        </BlurView>
      </DateTouchable>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={s.bottomSheet}
        handleIndicatorStyle={s.gray100Backround}>
        <DateRangePicker
          open
          range
          endDate={endDate}
          onChange={setDates}
          startDate={startDate}
          dayTextStyle={s.gray100Color}
          displayedDate={displayedDate}
          selectedStyle={s.redBackground}
          backdropStyle={s.backdropStyle}
          headerTextStyle={s.gray100Color}
          buttonTextStyle={s.gray100Color}
          dayHeaderTextStyle={s.gray100Color}
          containerStyle={{ ...s.bottomSheet, width }}
          monthPrevButton={<ChevronLeftIcon color={colors.gray100} />}
          monthNextButton={<ChevronRightIcon color={colors.gray100} />}
        />
      </BottomSheet>
    </GradientCententWrapper>
  );
};

export default Statistic;
