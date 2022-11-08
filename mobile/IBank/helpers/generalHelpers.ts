export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFormattedAmount = (amount: number) => new Intl.NumberFormat('de-DE').format(amount);
