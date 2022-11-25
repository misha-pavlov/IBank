import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowDownIcon, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { BottleIcon, CameraIcon, HammerIcon, PenIcon, PointIcon } from '../../assets/svg';
import { ScrollableBlackContentWrapper } from '../../common/common.styles';
import { colors } from '../../config/colors';
import { GET_SAVING_BY_ID } from '../../gql/saving.queries';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import { NSavingsNavigatorRouteProp } from '../../navigation/types/SavingsNavigator.types';
import { TSaving } from '../../types/saving';
import SavingSettingsItem from './components/SavingSettingsItem';

const SavingSettings = () => {
  const { setOptions } = useNavigation();
  const { params } = useRoute<NSavingsNavigatorRouteProp<'SavingSettings'>>();
  const { savingId } = params;

  useEffect(() => {
    setOptions({ headerTitle: 'Saving settings' });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_SAVING_BY_ID, { variables: { savingId } });

  if (loading || !data?.getSavingById) {
    return <ActivityIndicator />;
  }

  const { name, savingPoint } = data?.getSavingById as TSaving;

  return (
    <ScrollableBlackContentWrapper>
      <VStack space={6}>
        <SavingSettingsItem text="Change saving name" icon={<BottleIcon />} additionalText={name} />
        <SavingSettingsItem
          text="Change saving point"
          icon={<PointIcon />}
          additionalText={`${getFormattedAmount(savingPoint)} $`}
        />
        <SavingSettingsItem text="Add image" icon={<CameraIcon />} />
        <SavingSettingsItem text="Add description" icon={<PenIcon />} />
        <SavingSettingsItem text="Withdraw part" icon={<ArrowDownIcon size={6} color={colors.gray100} />} />
        <SavingSettingsItem text="Brake saving" icon={<HammerIcon />} withRedBackground />
      </VStack>
    </ScrollableBlackContentWrapper>
  );
};

export default SavingSettings;
