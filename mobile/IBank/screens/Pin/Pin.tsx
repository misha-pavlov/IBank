import { Avatar, Center } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import Keyboard from './components/Keyboard/Keyboard';
import PinString from './components/PinString/PinString';
import { screens } from '../../config/screens';
import { NAppNavigatorNavigationProp } from '../../navigation/types/AppNavigator.types';

const correctCode = '1234';

const Pin = () => {
  const [pinCode, setPinCode] = useState('');
  const pinRef = useRef<Animatable.View & View>(null);
  const { replace } = useNavigation<NAppNavigatorNavigationProp<'Card'>>();

  // check on correcting pin code
  useEffect(() => {
    if (pinCode.length === 4) {
      if (pinCode === correctCode) {
        replace(screens.app.Card);
      } else {
        // shake and clear on error
        if (pinRef?.current?.shake) {
          pinRef?.current?.shake();
          setPinCode('');
        }
      }
    }
  }, [pinCode, correctCode, pinRef, setPinCode]);

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
          bg={colors.pinkA100}
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
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
