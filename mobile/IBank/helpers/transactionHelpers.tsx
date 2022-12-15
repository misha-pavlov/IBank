import { Text, View } from 'native-base';
import React from 'react';
import { MoreIcon } from '../assets/svg';
import {
  AdvIcon,
  AnimalsIcon,
  BooksIcon,
  CafeIcon,
  CarIcon,
  CashIcon,
  CinemaIcon,
  ClothesIcon,
  CreditIcon,
  DutyFreeIcon,
  FinesIcon,
  FlowersIcon,
  InsureIcon,
  InternetIcon,
  MedicIcon,
  MobileIcon,
  MoneySendIcon,
  PlayIcon,
  ProductsIcon,
  RepaireIcon,
  SendOnCardIcon,
  TaxesIcon,
  TaxiIcon,
  TechnologiesIcon,
  Travelsicon,
} from '../assets/transactionsSvg';
import { RoundTouchable } from '../components';
import { colors } from '../config/colors';
import { TRANSACTION_TYPE_ENUM } from '../types/transaction';

export const getTransactionIconByType = (type?: string) => {
  switch (type) {
    case TRANSACTION_TYPE_ENUM.ADV:
      return <RoundTouchable icon={<AdvIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.ANIMALS:
      return <RoundTouchable icon={<AnimalsIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.BOOKS:
      return <RoundTouchable icon={<BooksIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CAFE:
      return <RoundTouchable icon={<CafeIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CAR:
      return <RoundTouchable icon={<CarIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CASH:
      return <RoundTouchable icon={<CashIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CINEMA:
      return <RoundTouchable icon={<CinemaIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CLOTHES:
      return <RoundTouchable icon={<ClothesIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.CREDIT:
      return <RoundTouchable icon={<CreditIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.DUTY_FREE:
      return <RoundTouchable icon={<DutyFreeIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.FINES:
      return <RoundTouchable icon={<FinesIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.FLOWERS:
      return <RoundTouchable icon={<FlowersIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.INSURE:
      return <RoundTouchable icon={<InsureIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.INTERNET:
      return <RoundTouchable icon={<InternetIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.MEDIC:
      return <RoundTouchable icon={<MedicIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.MOBILE:
      return <RoundTouchable icon={<MobileIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.MORE:
      return <RoundTouchable icon={<MoreIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.MONEY_SEND:
      return <RoundTouchable icon={<MoneySendIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.PLAY:
      return <RoundTouchable icon={<PlayIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.PRODUCTS:
      return <RoundTouchable icon={<ProductsIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.REPAIRE:
      return <RoundTouchable icon={<RepaireIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.SEND_ON_CARD:
      return <RoundTouchable icon={<SendOnCardIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.TAXES:
      return <RoundTouchable icon={<TaxesIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.TAXI:
      return <RoundTouchable icon={<TaxiIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.TECHNOLOGIES:
      return <RoundTouchable icon={<TechnologiesIcon />} backgroundColor={colors.green600} disabled />;

    case TRANSACTION_TYPE_ENUM.TRAVELS:
      return <RoundTouchable icon={<Travelsicon />} backgroundColor={colors.green600} disabled />;

    default:
      return (
        <View>
          <Text>Nothing</Text>
        </View>
      );
  }
};

export const getTransactionTitleByType = (type?: string) => {
  switch (type) {
    case 'play':
      return 'Games';

    default:
      return 'Nothing';
  }
};
