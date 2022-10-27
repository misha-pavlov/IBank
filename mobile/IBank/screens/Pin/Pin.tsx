import { Avatar, Center } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import Keyboard from './components/Keyboard/Keyboard';
import PinString from './components/PinString/PinString';
import { screens } from '../../config/screens';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';
import { useCurrentUser } from '../../hooks';
import { CHECK_USER_PIN } from './gql/Pin.queries';

const Pin = () => {
  const [pinCode, setPinCode] = useState('');
  const pinRef = useRef<Animatable.View & View>(null);
  const { replace } = useNavigation<NAppNavigatorNavigationProp<'Card'>>();

  const { user } = useCurrentUser();
  const [checkUserPin] = useLazyQuery(CHECK_USER_PIN);

  // check on correcting pin code
  useEffect(() => {
    (async () => {
      if (pinCode.length === 4) {
        const { data } = await checkUserPin({ variables: { userId: user?._id, pin: pinCode } });

        if (data?.checkUserPin) {
          replace(screens.app.Card);
        } else {
          // shake and clear on error
          if (pinRef?.current?.shake) {
            pinRef?.current?.shake();
            setPinCode('');
          }
        }
      }
    })();
  }, [pinCode, pinRef, setPinCode, replace, checkUserPin, user?._id]);

  const setNumber = useCallback(
    (number: number) => {
      if (pinCode.length !== 4) {
        setPinCode(pinCode + number.toString());
      }
    },
    [pinCode],
  );

  const removeLastNumber = useCallback(() => {
    const newCode = pinCode.substring(0, pinCode.length - 1);
    setPinCode(newCode);
  }, [pinCode]);

  return (
    <BlackContentWrapper>
      <Center pt={35}>
        <Avatar
          bg={colors.gray100}
          size="xl"
          source={{
            uri: user?.image,
          }}>
          FN
        </Avatar>
        <WhiteText fontSize={16} mt={15}>
          Enter your pin
        </WhiteText>
      </Center>

      <Center>
        <Animatable.View easing="ease-out" ref={pinRef}>
          <PinString enteredLength={pinCode.length} />
        </Animatable.View>
      </Center>

      <Keyboard setNumber={setNumber} removeLastNumber={removeLastNumber} />
    </BlackContentWrapper>
  );
};

export default Pin;
