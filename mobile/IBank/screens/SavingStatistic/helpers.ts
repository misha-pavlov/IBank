import { TSavedFromCards } from '../../types/saving';

export const groupSavedFromCards = (savedFromCards: TSavedFromCards) => {
  const numbers: Array<string> = [];

  savedFromCards.map(savedFromCard => !numbers.includes(savedFromCard.number) && numbers.push(savedFromCard.number));

  const groupedSavedFromCards = numbers.map(number => {
    return savedFromCards.filter(savedFromCard => savedFromCard.number === number && savedFromCard);
  });

  const amounts = groupedSavedFromCards.map(group => {
    return group.reduce((prev, curr) => prev + curr.amount, 0);
  });

  return numbers.map((number, index) => ({ number, amount: amounts[index] }));
};
