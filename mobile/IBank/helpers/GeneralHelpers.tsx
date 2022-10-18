import { Text, View } from 'native-base';
import React from 'react';
import { GameIcon } from '../assets/svg';
import { RoundTouchable } from '../components';
import { colors } from '../config/colors';

export const getTransactionIconByType = (type: string) => {
  switch (type) {
    case 'play':
      return (
        <RoundTouchable
          icon={<GameIcon width={24} height={24} fill={colors.gray100} />}
          backgroundColor={colors.green600}
          disabled
        />
      );

    default:
      return (
        <View>
          <Text>Nothing</Text>
        </View>
      );
  }
};

export const getTransactionTitleByType = (type: string) => {
  switch (type) {
    case 'play':
      return 'Games';

    default:
      return 'Nothing';
  }
};

export const getFormattedAmount = (amount: number) => new Intl.NumberFormat('de-DE').format(amount);