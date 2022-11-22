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
    icon: <UpdateCardIcon height={28} width={28} />,
    text: 'Update card',
  },
  {
    id: '2',
    icon: <BlockCardIcon height={28} width={28} />,
    text: 'Block card',
    underText: 'You can always ublock this card',
  },
  {
    id: '3',
    icon: <PinIcon height={28} width={28} />,
    text: 'Change pin',
  },
  {
    id: '4',
    icon: <RepublishIcon height={28} width={28} />,
    text: 'Republish card',
  },
  {
    id: '5',
    icon: <ReceiptIcon height={28} width={28} />,
    text: 'Get a receipt of card',
  },
  {
    id: '6',
    icon: <CheckoutIcon height={28} width={28} />,
    text: 'Send on card outside app',
  },
];
