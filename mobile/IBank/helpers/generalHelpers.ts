import moment from 'moment';

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFormattedAmount = (amount: number) => new Intl.NumberFormat('de-DE').format(amount);

export const dateToFromNowDaily = (myDate: moment.Moment) => {
  // ensure the date is displayed with today and yesterday
  return myDate.calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return myDate.format('MM/DD/YYYY');
    },
  });
};
