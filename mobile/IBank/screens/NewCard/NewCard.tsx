import { useNavigation, CommonActions, useRoute, RouteProp } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { Card, IBankBlackButton } from '../../components';
import { cardEnum } from '../../config/screens';
import { NCardNavigatorNavigationProp, NCardStackParamList } from '../../navigation/types/CardNavigator.types';

const NewCard = () => {
  const { params } = useRoute<RouteProp<NCardStackParamList, 'NewCard'>>();
  const card = params.card;
  const { height } = useWindowDimensions();
  const { dispatch } = useNavigation<NCardNavigatorNavigationProp<'Card'>>();

  const onPress = useCallback(() => {
    // Success, move to homepage.
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: cardEnum.Card }],
    });
    dispatch(resetAction);
  }, [dispatch]);

  return (
    <BlackContentWrapper>
      <View
        mt={50}
        flexDirection="column"
        justifyContent="space-between"
        // 79 - bottom bar, 32 - content wrapper, 50 - view mt
        height={height - 79 - 32 - 50}>
        <View>
          <Card
            withFullWidth
            type={card.type}
            cardNumber={card.number}
            expiredDate={card.expired}
            isMasterCard={card.isMasterCard}
          />
          <WhiteText textAlign="center" fontSize={16} fontWeight={500} mt={15}>
            Your new card
          </WhiteText>
        </View>
        <IBankBlackButton text="Finish" onPress={onPress} isRed />
      </View>
    </BlackContentWrapper>
  );
};

export default NewCard;
