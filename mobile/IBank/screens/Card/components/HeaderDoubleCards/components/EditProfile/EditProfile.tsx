import { Avatar, Center } from 'native-base';
import React from 'react';
import { WhiteText } from '../../../../../../common/common.styles';
import { colors } from '../../../../../../config/colors';

const EditProfile = () => {
  return (
    <>
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

      <Center mt={25} ml={8} mr={8} backgroundColor={colors.gray900}>
        <WhiteText fontSize={20} fontWeight={600}>
          Your personal data
        </WhiteText>
      </Center>
    </>
  );
};

export default EditProfile;
