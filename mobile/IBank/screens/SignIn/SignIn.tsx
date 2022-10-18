import React, { useState } from 'react';
import { Center, KeyboardAvoidingView, ScrollView } from 'native-base';
import { BankNameHeader, BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { BestCardText, HeaderBlock } from './SignIn.styles';
import { constants } from '../../config/constants';
import SignInForms from './components/SignInForms/SignInForms';
import { isIOS } from '../../config/platform';
import { getKeyboardVerticalOffsetForSignUp } from './helpers/SignIn.helpers';
import { Card } from '../../components';

const cardNumber = '1234 1234 1234 1234';

const SignIn = () => {
  const [currentStage, setCurrentStage] = useState<'pin' | 'phone'>(constants.signUpStages.phone);

  const keyboardVerticalOffset = getKeyboardVerticalOffsetForSignUp(currentStage === constants.signUpStages.phone);

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

          <SignInForms currentStage={currentStage} setCurrentStage={setCurrentStage} />
        </ScrollView>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default SignIn;
