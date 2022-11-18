import { TCard } from './card';

export enum UserSex {
  M = 'M',
  F = 'F',
}

export type TUser = {
  _id: string;
  birthday: Date;
  fullName: string;
  image: string;
  phone: string;
  pin: string;
  sex: string;
  savedCards: TCard[];
};
