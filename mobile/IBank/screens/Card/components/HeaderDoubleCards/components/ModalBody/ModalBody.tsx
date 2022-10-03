import { View } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { constants } from '../../../../../../config/constants';
import EditProfile from '../EditProfile/EditProfile';
import MainSection from '../MainSection/MainSection';

const ModalBody = () => {
  const [modalScreen, setModalScreen] = useState(constants.modal.screens[0]);
  console.log('modalScreen = ', modalScreen);

  const switchScreen = useCallback((screenName: string) => {
    setModalScreen(screenName);
  }, []);

  const renderScreens = useMemo(() => {
    switch (modalScreen) {
      case constants.modal.screens[0]:
        return <MainSection switchScreen={switchScreen} />;
      case constants.modal.screens[1]:
        return <EditProfile switchScreen={switchScreen} />;
      default:
        return <MainSection switchScreen={switchScreen} />;
    }
  }, [modalScreen, switchScreen]);

  return (
    <View flex={1} pl={8} pr={8}>
      {renderScreens}
    </View>
  );
};

export default ModalBody;
