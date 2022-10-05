import { ArrowBackIcon, Avatar, Center, Flex, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatIcon from '../../assets/svg/ChatIcon';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import MailIcon from '../../assets/svg/MailIcon';
import PhoneIcon from '../../assets/svg/PhoneIcon';
import { WhiteText, BlackContentWrapper } from '../../common/common.styles';
import { colors } from '../../config/colors';
import PersonalDataRow from './components/PersonalDataRow/PersonalDataRow';
import IBankBlackButton from '../../components/IBankBlackButton/IBankBlackButton';

const EditProfile = () => {
  const { goBack } = useNavigation();

  return (
    <BlackContentWrapper position="relative">
      <View position="absolute" top={75} left="16px" zIndex={100}>
        <TouchableOpacity onPress={goBack}>
          <ArrowBackIcon color={colors.gray100} />
        </TouchableOpacity>
      </View>

      <Center mt={50}>
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
          icon={<ChatIcon width={24} height={24} fill={colors.gray100} />}
        />

        <PersonalDataRow
          withMarginTop
          label="Phone"
          text="User phone"
          iconColor={colors.blueGray500}
          icon={<PhoneIcon width={24} height={24} fill={colors.gray100} />}
        />

        <PersonalDataRow
          withMarginTop
          label="Your email"
          text="User email"
          iconColor={colors.green600}
          icon={<MailIcon width={24} height={24} fill={colors.gray100} />}
        />

        <PersonalDataRow
          disabled
          withMarginTop
          label="Document"
          text="Your documents which you added"
          iconColor={colors.yellow700}
          icon={<DocumentIcon width={24} height={24} fill={colors.gray100} />}
        />
      </Flex>

      <View mt={12}>
        <IBankBlackButton text="Sign Out" onPress={() => console.log('SIGN OUT')} />
      </View>
    </BlackContentWrapper>
  );
};

export default EditProfile;
