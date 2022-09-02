import React from 'react';
import { ChevronLeftIcon, Stack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IBankHeader = () => {
  const { goBack } = useNavigation();

  return (
    <Stack mt="40px">
      <TouchableOpacity onPress={goBack}>
        <ChevronLeftIcon />
      </TouchableOpacity>
    </Stack>
  );
};

export default IBankHeader;
