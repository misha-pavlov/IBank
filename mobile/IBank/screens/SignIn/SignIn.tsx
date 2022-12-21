import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { BankNameHeader, BlackContentWrapper, commonStyles } from '../../common/common.styles';
import { BestCardText, HeaderBlock } from './SignIn.styles';
import { constants } from '../../config/constants';
import SignInForms from './components/SignInForms/SignInForms';
import { isIOS } from '../../config/platform';
import { getKeyboardVerticalOffsetForSignUp } from './helpers/SignIn.helpers';
import { Card } from '../../components';
import { CardType } from '../../types/card';

const cardNumber = '1234 1234 1234 1234';

const SignIn = () => {
  const [currentStage, setCurrentStage] = useState<'pin' | 'phone'>(constants.signUpStages.phone);
  const { width } = useWindowDimensions();

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

          <View ml={(width - 300) / 2}>
            <Card
              cardNumber={cardNumber}
              expiredDate={new Date('10/10/29')}
              isMasterCard
              type={CardType.PLATINUM}
              withFlip
            />
          </View>

          <BestCardText withMargin>Best card only with</BestCardText>
          <BestCardText>{constants.appName}</BestCardText>

          <SignInForms currentStage={currentStage} setCurrentStage={setCurrentStage} />
        </ScrollView>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default SignIn;
