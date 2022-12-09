export type TSavedFromCards = Array<{
  number: string;
  amount: number;
}>;

export type TSaving = {
  _id: string;
  name: string;
  savingPoint: number;
  saved: number;
  owner: string;
  description: string;
  imageUrl: string;
  savedFromCards: TSavedFromCards;
};
