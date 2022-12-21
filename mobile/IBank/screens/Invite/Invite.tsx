import { HStack, Text } from 'native-base';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchableOpacity } from 'react-native';
import { CopyIcon } from '../../assets/svg';
import { BlackContentWrapper, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { useCurrentUser } from '../../hooks';

const Invite = () => {
  const { user } = useCurrentUser();
  const inviteUrl = `https://ibank/r/${user?._id}`;

  return (
    <BlackContentWrapper>
      <WhiteText fontSize={18} fontWeight={600} textAlign="center">
        Invite friend - get 10$ on your cashback
      </WhiteText>

      <Text color={colors.gray500} textAlign="center" mt={30}>
        When new user install app from your link and active new card both of yours get 10$ on cashback
      </Text>

      <TouchableOpacity onLongPress={() => Clipboard.setString(inviteUrl)}>
        <HStack
          mt={30}
          space={4}
          py="16px"
          borderRadius={15}
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.black2}>
          <CopyIcon width={16} height={16} />
          <WhiteText>{inviteUrl}</WhiteText>
        </HStack>
      </TouchableOpacity>
    </BlackContentWrapper>
  );
};

export default Invite;
