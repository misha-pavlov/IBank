import { Avatar, Center, Flex, View } from 'native-base';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WhiteText, GradientCententWrapper } from '../../common/common.styles';
import { colors } from '../../config/colors';
import PersonalDataRow from './components/PersonalDataRow/PersonalDataRow';
import { ChatIcon, DocumentIcon, MailIcon, PhoneIcon } from '../../assets/svg';
import { IBankBlackButton } from '../../components';
import { useUserLoggedIn } from '../../hooks';

const EditProfile = () => {
  const { setOptions } = useNavigation();
  const { logOut } = useUserLoggedIn();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.black2, shadowColor: colors.black2 } });
  }, [setOptions]);

  return (
    <GradientCententWrapper
      colors={[colors.black2, colors.black3, colors.black3]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <Center mt={-25}>
        <WhiteText fontSize={20} fontWeight={600}>
          Your personal data
        </WhiteText>
      </Center>

      <Center mt={25}>
        <Avatar
          bg={colors.pinkA100}
          size="xl"
          source={{
            uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
          }}>
          FN
        </Avatar>
      </Center>

      <Flex mt={25} px="16px" py="32px" flexDirection="column" backgroundColor={colors.gray900} borderRadius={10}>
        <PersonalDataRow
          label="What is your name?"
          text="Firs + Last name"
          iconColor={colors.orange600}
          icon={<ChatIcon />}
        />

        <PersonalDataRow
          withMarginTop
          label="Phone"
          text="User phone"
          iconColor={colors.blueGray500}
          icon={<PhoneIcon />}
        />

        <PersonalDataRow
          withMarginTop
          label="Your email"
          text="User email"
          iconColor={colors.green600}
          icon={<MailIcon />}
        />

        <PersonalDataRow
          disabled
          withMarginTop
          label="Document"
          text="Your documents which you added"
          iconColor={colors.yellow700}
          icon={<DocumentIcon />}
        />
      </Flex>

      <View mt={12}>
        <IBankBlackButton text="Sign Out" onPress={logOut} />
      </View>
    </GradientCententWrapper>
  );
};

export default EditProfile;
