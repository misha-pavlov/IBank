import { useMutation } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { omit } from 'lodash';
import { Center, HStack, Image, Switch, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { IBankBlackButton } from '../../components';
import { cardEnum } from '../../config/screens';
import { useCurrentUser } from '../../hooks';
import { NCardNavigatorNavigationProp, NCardStackParamList } from '../../navigation/types/CardNavigator.types';
import { ADD_TO_SAVED_CARDS } from './DoneTransaction.mutations';

const DoneTransaction = () => {
  const { user } = useCurrentUser();
  const { setOptions, replace } = useNavigation<NCardNavigatorNavigationProp<'Card'>>();
  const { params } = useRoute<RouteProp<NCardStackParamList, 'DoneTransaction'>>();
  const { card, showSaveCardSwitcher } = params;

  const [isSaveCard, setIsSaveCard] = useState(showSaveCardSwitcher);

  useEffect(() => {
    setOptions({ headerTitle: 'Your transaction is done' });
  }, [setOptions]);

  const [addtoSavedCardsMutate] = useMutation(ADD_TO_SAVED_CARDS, {
    onError: err => console.error('ADD_TO_SAVED_CARDS = ', err),
  });

  const onPress = () => {
    if (isSaveCard) {
      addtoSavedCardsMutate({
        variables: { userId: user?._id, card: omit(card, ['__typename']) },
        onCompleted: () => replace(cardEnum.Card),
      });
    } else {
      replace(cardEnum.Card);
    }
  };

  return (
    <BlackContentWrapper>
      <Center>
        <Image
          mt={25}
          mb={25}
          width="100%"
          height={200}
          alt="cat gif"
          borderRadius={25}
          onLoad={() => <ActivityIndicator />}
          source={{ uri: 'https://media.giphy.com/media/zQR7qMJ3Esh0Y/giphy.gif' }}
        />
        {showSaveCardSwitcher && (
          <HStack alignItems="center" space={8}>
            <Switch value={isSaveCard} onValueChange={value => setIsSaveCard(value)} colorScheme="emerald" />
            <WhiteText fontWeight={500} fontSize={16} textAlign="center">
              Do you wanna save card: {'\n'}
              <WhiteText textAlign="center">{card.number.replace(card.number.substring(6, 12), '****')}</WhiteText>
            </WhiteText>
          </HStack>
        )}
      </Center>

      <View mt={25}>
        <IBankBlackButton text="Finish" isRed onPress={onPress} />
      </View>
    </BlackContentWrapper>
  );
};

export default DoneTransaction;
