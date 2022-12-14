import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Button, Input, Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { TransactionItem } from '../../components';
import { colors } from '../../config/colors';
import { appEnum } from '../../config/screens';
import { capitalizeFirstLetter } from '../../helpers/generalHelpers';
import { getTransactionIconByType } from '../../helpers/transactionHelpers';
import { useCurrentCard } from '../../hooks';
import { NCardNavigatorNavigationProp } from '../../navigation/types/CardNavigator.types';
import { TRANSACTION_TYPE_ENUM } from '../../types/transaction';

const OPERATIONS = [
  { type: TRANSACTION_TYPE_ENUM.MOBILE },
  { type: TRANSACTION_TYPE_ENUM.INTERNET },
  { type: TRANSACTION_TYPE_ENUM.TAXES },
  { type: TRANSACTION_TYPE_ENUM.CASH },
];

const OtherPayments = () => {
  const { setOptions, navigate } = useNavigation<NCardNavigatorNavigationProp<'MoneyOperation'>>();
  const { currentCard } = useCurrentCard();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(TRANSACTION_TYPE_ENUM.MOBILE);
  const [number, setNumber] = useState('');

  useEffect(() => {
    setOptions({ headerTitle: 'Other payments' });
  }, [setOptions]);

  return (
    <BlackContentWrapper>
      <WhiteText fontSize={18} fontWeight={600} mb="16px">
        Categories
      </WhiteText>
      <FlashList
        data={OPERATIONS}
        estimatedItemSize={69}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setType(item.type);
            }}>
            <TransactionItem
              text={capitalizeFirstLetter(item.type.toLowerCase())}
              icon={getTransactionIconByType(item.type)}
            />
          </TouchableOpacity>
        )}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" backgroundColor={colors.black}>
          <Modal.CloseButton />
          <Modal.Header backgroundColor={colors.black}>
            <WhiteText>Enter phone or account number</WhiteText>
          </Modal.Header>
          <Modal.Body>
            <Input value={number} color={colors.gray100} onChangeText={value => setNumber(value)} />
          </Modal.Body>
          <Modal.Footer backgroundColor={colors.black}>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  navigate(appEnum.MoneyOperation, {
                    type,
                    from: currentCard,
                    sendOnNumber: number,
                    buttonText: 'Finish',
                    headerTitle: 'Send on number',
                  });
                }}>
                Go next
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </BlackContentWrapper>
  );
};

export default OtherPayments;
