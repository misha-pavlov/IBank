import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, Flex, View } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BlackContentWrapper, CardCube, WhiteText } from '../../common/common.styles';
import { IBankBlackButton, PinInput } from '../../components';
import { cardEnum } from '../../config/screens';
import { CREATE_CARD } from '../../gql/card.mutations';
import { getCardByType } from '../../helpers/cardHelpers';
import { capitalizeFirstLetter } from '../../helpers/generalHelpers';
import { useCurrentUser } from '../../hooks';
import { NCardNavigatorNavigationProp } from '../../navigation/types/CardNavigator.types';
import { CardType, TCard } from '../../types/card';
import { GET_USER_CARDS } from '../HeaderModal/gql/HeaderModal.queries';

const IBANK_CARDS = [CardType.BLACK, CardType.IRON, CardType.PLATINUM];
const IS_MASTER_CARD = 'isMasterCard';

const AddNewCard = () => {
  const [selected, setSelected] = useState<CardType | null>(null);
  const [groupValues, setGroupValues] = useState([IS_MASTER_CARD, 'autoSelect']);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const { user } = useCurrentUser();

  const { navigate } = useNavigation<NCardNavigatorNavigationProp<'NewCard'>>();

  const [createCardMutate] = useMutation(CREATE_CARD, {
    onError: e => console.error('CREATE_CARD = ', e),
  });

  const onPress = useCallback(() => {
    if (user) {
      createCardMutate({
        variables: { pin, owner: user?._id, isMasterCard: groupValues.includes(IS_MASTER_CARD), type: selected },
        onCompleted: (card: { createCard: TCard }) => navigate(cardEnum.NewCard, { card: card.createCard }),
        refetchQueries: [{ query: GET_USER_CARDS, variables: { owner: user?._id } }],
      });
    }
  }, [createCardMutate, groupValues, navigate, pin, selected, user]);

  const renderCards = useMemo(() => {
    return (
      <Flex flexDirection="row" justifyContent="space-between" mt={50} mb={35} mx="10px">
        {IBANK_CARDS.map((card: CardType) => (
          <TouchableOpacity key={card} onPress={() => setSelected(card)}>
            <CardCube isSelectedCard={selected === card} maxWidth="54px">
              {getCardByType(card)}
            </CardCube>
            <WhiteText mt="5px" textAlign="center">
              {capitalizeFirstLetter(card.toLowerCase())}
            </WhiteText>
          </TouchableOpacity>
        ))}
      </Flex>
    );
  }, [selected]);

  return (
    <BlackContentWrapper>
      <WhiteText textAlign="center" fontSize={20} fontWeight={600}>
        Select your new card
      </WhiteText>
      {renderCards}

      <Checkbox.Group
        mb="15px"
        value={groupValues}
        onChange={setGroupValues}
        accessibilityLabel="choose small corrects">
        <Checkbox value="isMasterCard" colorScheme="danger" my={2}>
          <WhiteText>Is Master Card</WhiteText>
        </Checkbox>

        <Checkbox value="autoSelect" colorScheme="danger">
          <WhiteText>Auto select this card</WhiteText>
        </Checkbox>
      </Checkbox.Group>

      <View mb="15px">
        <PinInput pin={pin} setPin={setPin} showPin={showPin} setShowPin={setShowPin} isMaxWidth />
      </View>

      <IBankBlackButton text="Create" disabled={!selected || pin.length !== 4} onPress={onPress} />
    </BlackContentWrapper>
  );
};

export default AddNewCard;
