import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowDownIcon, Center, Divider, HStack, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { BottleIcon, HammerIcon, StatisticIcon, TopUpIconV2 } from '../../assets/svg';
import { ScrollableBlackContentWrapper, WhiteText } from '../../common/common.styles';
import { RoundTouchable } from '../../components';
import { colors } from '../../config/colors';
import { cardEnum } from '../../config/screens';
import { GET_SAVING_BY_ID } from '../../gql/saving.queries';
import { getFormattedAmount } from '../../helpers/generalHelpers';
import {
  NSavingsNavigatorNavigationProp,
  NSavingsNavigatorRouteProp,
} from '../../navigation/types/SavingsNavigator.types';
import { TSaving } from '../../types/saving';

const rotateStyle = { transform: [{ rotate: '75deg' }] };

const Saving = () => {
  const { setOptions, navigate } = useNavigation<NSavingsNavigatorNavigationProp<'TopUp'>>();
  const { params } = useRoute<NSavingsNavigatorRouteProp<'Saving'>>();
  const { savingId } = params;

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.pink, shadowColor: colors.pink } });
  }, [setOptions]);

  const { data, loading } = useQuery(GET_SAVING_BY_ID, { variables: { savingId } });

  if (loading || !data?.getSavingById) {
    return <ActivityIndicator />;
  }

  const { name, saved, savingPoint } = data?.getSavingById as TSaving;

  const calculateHeightAccordingSaved = () => {
    if (saved === 0) {
      return 225;
    }

    if (saved === savingPoint) {
      return 0;
    }

    return (225 * saved) / savingPoint;
  };

  return (
    <ScrollableBlackContentWrapper>
      <Center>
        <VStack space={2}>
          <Center>
            <View backgroundColor={colors.pink1} p="16px" borderRadius={50}>
              <BottleIcon />
            </View>
          </Center>

          <WhiteText textAlign="center" fontSize={16}>
            {name}
          </WhiteText>

          <Center>
            <Divider borderRadius={50} color={colors.gray100} h={0.4} w="100%" />
          </Center>

          <WhiteText textAlign="center" fontSize={24}>
            {getFormattedAmount(saved)} $
          </WhiteText>

          <Center mt={15}>
            <Center position="relative" h={230} w={230} overflow="hidden">
              <View
                w={200}
                h={200}
                zIndex={0}
                borderRadius={35}
                position="absolute"
                style={rotateStyle}
                backgroundColor={colors.pink1}
              />

              <View position="absolute" overflow="hidden" zIndex={2} height={calculateHeightAccordingSaved()} top={0}>
                <BottleIcon width={225} height={225} />
              </View>

              <View position="absolute" zIndex={1} top={0}>
                <BottleIcon width={255} height={225} fill={colors.green2} />
              </View>
            </Center>
          </Center>
        </VStack>

        <VStack mt={45} space={6}>
          <Center px="16px">
            <HStack justifyContent="space-around" w="100%">
              <RoundTouchable
                withBorder
                text="Top up"
                icon={<TopUpIconV2 />}
                onPress={() => navigate(cardEnum.TopUp, { sendOnSaving: savingId })}
              />
              <RoundTouchable withBorder icon={<BottleIcon />} text="Settings" onPress={() => console.log('123')} />
              <RoundTouchable withBorder icon={<StatisticIcon />} text="Statistic" onPress={() => console.log('123')} />
              <RoundTouchable
                withBorder
                icon={<ArrowDownIcon size={6} color={colors.gray100} />}
                text="Withdraw part"
                onPress={() => console.log('123')}
              />
              <RoundTouchable withBorder icon={<HammerIcon />} text="Brake saving" onPress={() => console.log('123')} />
            </HStack>
          </Center>
        </VStack>
      </Center>
    </ScrollableBlackContentWrapper>
  );
};

export default Saving;
