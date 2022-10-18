import { Center, HStack, View } from 'native-base';
import React, { FC } from 'react';
import { AnotherActionsIcon, SendOnCardIcon, TopUpIcon } from '../../../../assets/svg';
import { SectionGradient, WhiteText } from '../../../../common/common.styles';
import { RoundTouchable } from '../../../../components';
import { colors } from '../../../../config/colors';
import { getFormattedAmount } from '../../../../helpers/GeneralHelpers';
import HeaderDoubleCards from '../../components/HeaderDoubleCards/HeaderDoubleCards';
import MoveToCard from './components/MoveToCard/MoveToCard';

type TAmount = {
  renderPaginaton: JSX.Element;
  moveToNextScreen: () => void;
};

const Amount: FC<TAmount> = ({ renderPaginaton, moveToNextScreen }) => {
  return (
    <View flex={1}>
      <HeaderDoubleCards />
      <SectionGradient
        colors={[colors.whiteRed, colors.whiteBlue, colors.whiteBlue1]}
        start={{ x: 0.0, y: 0.7 }}
        end={{ x: 0.9, y: 0.5 }}
        locations={[1, 0.5, 0]}
        withoutBorderRadius>
        <View mt="100px" justifyContent="space-between">
          <View flexDirection="row" justifyContent="space-between">
            <WhiteText fontSize={40} fontWeight={600} ml={34}>
              {getFormattedAmount(6717.61)} $
            </WhiteText>

            <MoveToCard moveToNextScreen={moveToNextScreen} />
          </View>

          <View>
            <Center mb="-15px" mt="10%">
              {renderPaginaton}
            </Center>
            <HStack justifyContent="space-between" mx={34}>
              <RoundTouchable
                text="Top up your card"
                icon={<TopUpIcon width={24} height={24} fill={colors.gray100} />}
                onPress={() => console.log('123gg')}
              />

              <RoundTouchable
                text="Send on card"
                icon={<SendOnCardIcon width={24} height={24} fill={colors.gray100} />}
                onPress={() => console.log('123gg')}
              />

              <RoundTouchable
                text="Another actions"
                icon={<AnotherActionsIcon width={24} height={24} fill={colors.gray100} />}
                onPress={() => console.log('123gg')}
              />
            </HStack>
          </View>
        </View>
      </SectionGradient>

      <WhiteText>transactions list</WhiteText>
    </View>
  );
};

export default Amount;
