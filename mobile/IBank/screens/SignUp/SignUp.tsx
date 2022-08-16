import React, { useState } from 'react';
import { Center, KeyboardAvoidingView, ScrollView } from 'native-base';
import { BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { BankNameHeader, BestCardText, HeaderBlock } from './SignUp.styles';
import { constants } from '../../config/constants';
import Card from '../../components/Card/Card';
import SinUpForms from './components/SinUpForms/SinUpForms';
import {
  isIOS,
  getKeyboardVerticalOffsetForSignUp,
} from '../../config/platform';

const cardNumber = '1234 1234 1234 1234';

const SignUp = () => {
  const [currentStage, setCurrentStage] = useState<'pin' | 'phone'>(
    constants.signUpStages.phone,
  );

  const keyboardVerticalOffset = getKeyboardVerticalOffsetForSignUp(
    currentStage === constants.signUpStages.phone,
  );

  return (
    <BlackContentWrapper>
      <KeyboardAvoidingView
        style={commonStyles.keyboardAvoiding}
        behavior={isIOS() ? 'position' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView>
          <HeaderBlock>
            <BankNameHeader>{constants.appName}</BankNameHeader>
          </HeaderBlock>

          <Center>
            <Card cardNumber={cardNumber} expiredDate="10/29" withFlip />
          </Center>

          <BestCardText withMargin>Best card only with</BestCardText>
          <BestCardText>{constants.appName}</BestCardText>

          <SinUpForms
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default SignUp;
