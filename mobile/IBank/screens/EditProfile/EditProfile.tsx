import { Avatar, Center, Flex, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { WhiteText, GradientCententWrapper } from '../../common/common.styles';
import { colors } from '../../config/colors';
import PersonalDataRow from './components/PersonalDataRow/PersonalDataRow';
import { ChatIcon, DocumentIcon, CalendarIcon, PhoneIcon } from '../../assets/svg';
import { IBankBlackButton } from '../../components';
import { useCurrentUser, useUserLoggedIn } from '../../hooks';
import { EDIT_PROFILE } from './gql/EditProfile.mutations';
import { getInitial } from '../../helpers/userHelpers';
import { GET_USER } from '../../gql/user.queries';

const LOADING = 'Loading';

const EditProfile = () => {
  const { setOptions, addListener } = useNavigation();
  const { logOut } = useUserLoggedIn();
  const { user } = useCurrentUser();

  const [fields, setFields] = useState({ fullName: user?.fullName, phone: user?.phone, birthday: user?.birthday });

  const [editProfileMutate] = useMutation(EDIT_PROFILE, {
    onError: e => console.error('EDIT_PROFILE = ', e),
  });

  const editProfile = useCallback(
    (fullName: string, phone: string, birthday: Date) => {
      if (user) {
        editProfileMutate({
          variables: {
            userId: user._id,
            fullName,
            phone,
            birthday,
          },
          refetchQueries: [{ query: GET_USER }],
        });
      }
    },
    [editProfileMutate, user],
  );
  const onFieldChange = useCallback(
    (value: string | Date, field: string) => {
      setFields({ ...fields, [field]: value });
    },
    [fields],
  );

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.black2, shadowColor: colors.black2 } });
  }, [setOptions]);

  useEffect(() => {
    addListener('beforeRemove', () => {
      const { fullName, phone, birthday } = fields;

      if (fullName && phone && birthday) {
        // next conditions need for escape of unnecessary edits
        const isNewFullName = fullName !== user?.fullName;
        const isNewPhone = phone !== user?.phone;
        const isNewBirthday = birthday !== user?.birthday;

        if (isNewFullName || isNewPhone || isNewBirthday) {
          editProfile(fullName, phone, birthday);
        }
      }
    });
  }, [fields, addListener, editProfile, user?.fullName, user?.phone, user?.birthday]);

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
          bg={colors.black}
          size="xl"
          source={{
            uri: user?.image,
          }}>
          {getInitial(fields?.fullName)}
        </Avatar>
      </Center>

      <Flex mt={25} px="16px" py="32px" flexDirection="column" backgroundColor={colors.gray900} borderRadius={10}>
        <PersonalDataRow
          label="What is your name?"
          text={fields?.fullName || LOADING}
          iconColor={colors.orange600}
          icon={<ChatIcon />}
          fieldName="fullName"
          onFieldChange={onFieldChange}
        />

        <PersonalDataRow
          withMarginTop
          label="Phone"
          text={fields?.phone || LOADING}
          iconColor={colors.blueGray500}
          icon={<PhoneIcon />}
          fieldName="phone"
          onFieldChange={onFieldChange}
        />

        <PersonalDataRow
          withMarginTop
          label="Your birthday"
          text={fields?.birthday?.toString() || LOADING}
          iconColor={colors.green600}
          icon={<CalendarIcon />}
          fieldName="birthday"
          onFieldChange={onFieldChange}
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
