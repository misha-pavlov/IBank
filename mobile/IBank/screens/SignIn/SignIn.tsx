import React, { useCallback, useState } from 'react';
import { Center, KeyboardAvoidingView, ScrollView } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlackContentWrapper, commonStyles } from '../../common/common.styles';
import {
  BankNameHeader,
  BestCardText,
  HeaderBlock,
  MoveToSignUpText,
} from './SignIn.styles';
import { constants } from '../../config/constants';
import Card from '../../components/Card/Card';
import SignInForms from './components/SignInForms/SignInForms';
import { isIOS } from '../../config/platform';
import { getKeyboardVerticalOffsetForSignUp } from './helpers/SignIn.helpers';
import { screens } from '../../config/screens';
import { NAuthNavigatorNavigationProp } from '../../navigation/types/AuthNavigator.types';

const cardNumber = '1234 1234 1234 1234';

const SignIn = () => {
  const navigation = useNavigation<NAuthNavigatorNavigationProp<'SignUp'>>();
  const [currentStage, setCurrentStage] = useState<'pin' | 'phone'>(
    constants.signUpStages.phone,
  );

  const keyboardVerticalOffset = getKeyboardVerticalOffsetForSignUp(
    currentStage === constants.signUpStages.phone,
  );

  const moveToSignUp = useCallback(() => {
    return navigation.navigate(screens.auth.SignUp);
  }, [navigation]);

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

          <SignInForms
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />

          <TouchableOpacity onPress={moveToSignUp}>
            <MoveToSignUpText>
              Don't have account? Let's create.
            </MoveToSignUpText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </BlackContentWrapper>
  );
};

export default SignIn;
