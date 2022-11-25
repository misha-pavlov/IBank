import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowDownIcon, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// svg
import { BottleIcon, CameraIcon, HammerIcon, PenIcon, PointIcon } from '../../assets/svg';
// styles
import { ScrollableBlackContentWrapper } from '../../common/common.styles';
// constants
import { colors } from '../../config/colors';
import { savingsEnum } from '../../config/screens';
// gql
import { GET_SAVING_BY_ID } from '../../gql/saving.queries';
import { UPDATE_SAVING } from './SavingSettings.queries';
// helpers
import { getFormattedAmount } from '../../helpers/generalHelpers';
// types
import {
  NSavingsNavigatorNavigationProp,
  NSavingsNavigatorRouteProp,
} from '../../navigation/types/SavingsNavigator.types';
import { TSaving } from '../../types/saving';
// components
import SavingSettingsItem from './components/SavingSettingsItem';

const SavingSettings = () => {
  const { setOptions, navigate } = useNavigation<NSavingsNavigatorNavigationProp<'CreateSaving'>>();
  const { params } = useRoute<NSavingsNavigatorRouteProp<'SavingSettings'>>();
  const { savingId } = params;

  useEffect(() => {
    setOptions({ headerTitle: 'Saving settings' });
  }, [setOptions]);

  const [updateSavingMutate] = useMutation(UPDATE_SAVING, { onError: err => console.error('UPDATE_SAVING = ', err) });

  const { data, loading } = useQuery(GET_SAVING_BY_ID, { variables: { savingId } });

  if (loading || !data?.getSavingById) {
    return <ActivityIndicator />;
  }

  const { name, savingPoint } = data?.getSavingById as TSaving;

  return (
    <ScrollableBlackContentWrapper>
      <VStack space={6}>
        <SavingSettingsItem
          icon={<BottleIcon />}
          additionalText={name}
          text="Change saving name"
          onPress={() =>
            navigate(savingsEnum.CreateSaving, {
              savingId,
              oneStep: 1,
              oldValue: name,
              onCompleted: updateSavingMutate,
            })
          }
        />
        <SavingSettingsItem
          icon={<PointIcon />}
          text="Change saving point"
          onPress={() => console.log('123')}
          additionalText={`${getFormattedAmount(savingPoint)} $`}
        />
        <SavingSettingsItem text="Add image" icon={<CameraIcon />} onPress={() => console.log('123')} />
        <SavingSettingsItem text="Add description" icon={<PenIcon />} onPress={() => console.log('123')} />
        <SavingSettingsItem
          text="Withdraw part"
          onPress={() => console.log('123')}
          icon={<ArrowDownIcon size={6} color={colors.gray100} />}
        />
        <SavingSettingsItem
          withRedBackground
          text="Brake saving"
          icon={<HammerIcon />}
          onPress={() => console.log('123')}
        />
      </VStack>
    </ScrollableBlackContentWrapper>
  );
};

export default SavingSettings;
