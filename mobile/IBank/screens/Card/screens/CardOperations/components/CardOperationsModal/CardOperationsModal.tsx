import { FetchResult } from '@apollo/client';
import { isEqual } from 'lodash';
import { Button, Modal, Select } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';
import { WhiteText } from '../../../../../../common/common.styles';
import { PinInput } from '../../../../../../components';
import { colors } from '../../../../../../config/colors';
import { CardType } from '../../../../../../types/card';
import { getPossibleToUpdateCards } from '../../CardOperations.helpers';

type TCardOperationsModal = {
  type: CardType;
  showModal?: string;
  setShowModal: (value: React.SetStateAction<string | undefined>) => void;
  onSubmit: (
    id: string,
    newType: CardType,
    newPin: string,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>> | null;
  updateCurrentCard: () => Promise<void>;
};

const CardOperationsModal: FC<TCardOperationsModal> = ({
  type,
  showModal,
  setShowModal,
  onSubmit,
  updateCurrentCard,
}) => {
  const [selectedValue, setSelectedValue] = useState(type);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const updateCard = useMemo(() => {
    const possibleToUpdateCards = getPossibleToUpdateCards(type);

    if (possibleToUpdateCards.length === 0) {
      return <WhiteText>Your card have maximum type</WhiteText>;
    }

    return (
      <Select
        selectedValue={selectedValue}
        placeholder={`Current card type: ${selectedValue}`}
        variant="filled"
        placeholderTextColor={colors.gray100}
        color={colors.gray100}
        onValueChange={value => setSelectedValue(value as CardType)}>
        {possibleToUpdateCards.map(card => (
          <Select.Item key={card.rank} label={card.type} value={card.type} />
        ))}
      </Select>
    );
  }, [selectedValue, type]);

  const renderModalBody = useMemo(() => {
    switch (showModal) {
      case '1':
        return updateCard;

      case '3':
        return <PinInput pin={pin} showPin={showPin} setPin={setPin} setShowPin={setShowPin} />;

      default:
        return null;
    }
  }, [pin, showModal, showPin, updateCard]);

  return (
    <Modal isOpen={!!showModal} onClose={() => setShowModal(undefined)}>
      <Modal.Content maxWidth="400px" backgroundColor={colors.black}>
        <Modal.Body>{renderModalBody}</Modal.Body>
        <Modal.Footer backgroundColor={colors.black}>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => setShowModal(undefined)}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                showModal &&
                  onSubmit(showModal, selectedValue, pin)?.then(() =>
                    updateCurrentCard().then(() => setShowModal(undefined)),
                  );
              }}>
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default memo(CardOperationsModal, isEqual);
