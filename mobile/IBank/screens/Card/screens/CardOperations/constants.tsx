import React from 'react';
import {
  BlockCardIcon,
  CheckoutIcon,
  PinIcon,
  ReceiptIcon,
  RepublishIcon,
  UpdateCardIcon,
} from '../../../../assets/svg';
import { TCardSettingsArray } from './types';

export const cardSettings: TCardSettingsArray = [
  {
    id: '1',
    icon: <UpdateCardIcon />,
    text: 'Update card',
  },
  {
    id: '2',
    icon: <BlockCardIcon />,
    text: 'Block card',
    underText: 'You can always ublock this card',
  },
  {
    id: '3',
    icon: <PinIcon />,
    text: 'Change pin',
  },
  {
    id: '4',
    icon: <RepublishIcon />,
    text: 'Republish card',
  },
  {
    id: '5',
    icon: <ReceiptIcon />,
    text: 'Get a receipt of card',
  },
  {
    id: '6',
    icon: <CheckoutIcon />,
    text: 'Send on card outside app',
  },
];
