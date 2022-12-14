import { useQuery } from '@apollo/client';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import { ChevronLeftIcon, ChevronRightIcon, View } from 'native-base';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import DateRangePicker from 'react-native-daterange-picker';
import { isEqual } from 'lodash';
// svg
import { CalendarIcon } from '../../../../assets/svg';
// styles
import { commonStyles, WhiteText } from '../../../../common/common.styles';
import { DateTouchable, s } from './CalendarPiker.styles';
// components
import { IBankBlackButton } from '../../../../components';
// constants
import { colors } from '../../../../config/colors';
import { constants } from '../../../../config/constants';
// gql
import { GET_CARD_TRANSACTIONS_BY_DATES } from './CalendarPiker.queries';
// types
import { GetCardTransactionsByDates } from '../../../../types/transaction';
import { TCard } from '../../../../types/card';

type TDates = {
  endDate?: moment.Moment;
  startDate?: moment.Moment;
  displayedDate?: moment.Moment;
};

type TCalendarPiker = {
  selectedCard: TCard;
  cardTransactionsByDates?: GetCardTransactionsByDates;
  setCardTransactionsByDates: React.Dispatch<React.SetStateAction<GetCardTransactionsByDates | undefined>>;
};

const CalendarPiker: FC<TCalendarPiker> = ({ selectedCard, cardTransactionsByDates, setCardTransactionsByDates }) => {
  const { width, height } = useWindowDimensions();

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
    if (dates.startDate) {
      setStartDate(dates.startDate);
    }

    if (dates.displayedDate) {
      setDisplayedDate(dates.displayedDate);
    }

    if (dates.endDate) {
      setEndDate(dates.endDate);
    }
  };

  const { data } = useQuery(GET_CARD_TRANSACTIONS_BY_DATES, {
    variables: { cardId: selectedCard._id, startDate: startDate.toDate(), endDate: endDate.toDate() },
  });

  // Bottom sheet link: https://gorhom.github.io/react-native-bottom-sheet/
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '85%', '90%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} opacity={0} />
    ),
    [],
  );

  const renderFooter = useCallback(
    (props: BottomSheetDefaultFooterProps) => (
      <BottomSheetFooter {...props}>
        <View px="16px" pb="16px">
          <IBankBlackButton text="Done" onPress={() => bottomSheetRef.current?.close()} />
        </View>
      </BottomSheetFooter>
    ),
    [],
  );

  const containerStyle = { marginLeft: -16, marginRight: -16, height };

  return (
    <View zIndex={101}>
      <DateTouchable onPress={() => bottomSheetRef.current?.expand()}>
        <WhiteText>{startDate.format(startDateFormat)} - </WhiteText>
        <WhiteText>{endDate.format(constants.dateFormats.D_MMMM_YYYY_WithSpaces)}</WhiteText>

        <BlurView blurType="light" style={s.blur}>
          <CalendarIcon width={11} height={11} />
        </BlurView>
      </DateTouchable>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        footerComponent={renderFooter}
        backgroundStyle={commonStyles.blackBackground}
        backdropComponent={renderBackdrop}
        containerStyle={containerStyle}
        onClose={() =>
          !isEqual(cardTransactionsByDates, data?.getCardTransactionsByDates) &&
          setCardTransactionsByDates(data?.getCardTransactionsByDates)
        }
        handleIndicatorStyle={commonStyles.gray100Backround}>
        <DateRangePicker
          open
          range
          endDate={endDate}
          onChange={setDates}
          startDate={startDate}
          displayedDate={displayedDate}
          dayTextStyle={s.gray100Color}
          selectedStyle={s.redBackground}
          backdropStyle={s.backdropStyle}
          headerTextStyle={s.gray100Color}
          buttonTextStyle={s.gray100Color}
          dayHeaderTextStyle={s.gray100Color}
          containerStyle={{ ...commonStyles.blackBackground, width }}
          monthPrevButton={<ChevronLeftIcon color={colors.gray100} />}
          monthNextButton={<ChevronRightIcon color={colors.gray100} />}
        />
      </BottomSheet>
    </View>
  );
};

export default memo(CalendarPiker, isEqual);
