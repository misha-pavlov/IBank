import { Center, ChevronDownIcon } from 'native-base';
import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import DoubleCards from '../../../../assets/svg/DoubleCards';
import { colors } from '../../../../config/colors';
import ModalBody from './components/ModalBody/ModalBody';
import { IconRoundBlock, ScrollBlock, s } from './HeaderDoubleCards.styles';

const HeaderDoubleCards = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible, setModalVisible]);

  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        translateY.value = 0;
        toggleModal();
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  return (
    <ScrollBlock scrollEventThrottle={16} onScroll={scrollHandler}>
      <Center mt={35}>
        <IconRoundBlock onPress={toggleModal}>
          <DoubleCards width={18} height={18} />
        </IconRoundBlock>
        <ChevronDownIcon mt="5px" size={18} color={colors.grey500} />
      </Center>

      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="up"
        useNativeDriver={true}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={800}
        animationOutTiming={800}
        backdropColor={colors.black}
        backdropOpacity={1}
        style={s.modalMargin}>
        <ModalBody />
      </Modal>
    </ScrollBlock>
  );
};

export default HeaderDoubleCards;
