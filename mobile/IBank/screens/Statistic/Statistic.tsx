import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GradientCententWrapper, SectionGradient, TransparentBox, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import CardPicker from '../../components/CardPicker/CardPicker';
import CalendarPiker from './components/CalendarPiker/CalendarPiker';
import { FlatList, Flex, Text, View } from 'native-base';
import CategoryIcon from '../../assets/svg/CategoryIcon';
import TransactionItem from '../../components/TransactionItem/TransactionItem';

const Statistic = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkBlue, shadowColor: colors.darkBlue } });
  }, [setOptions]);

  return (
    <GradientCententWrapper
      colors={[colors.darkBlue, colors.purple1, colors.purple1]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <WhiteText fontSize={20} fontWeight={600}>
        Statistic
      </WhiteText>

      {/* TODO: fix position bottom sheets */}
      <CalendarPiker />
      <CardPicker />

      <View mt={25}>
        <SectionGradient
          colors={[colors.blueYellow1, colors.blueYellow2, colors.blueYellow3]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 0.7, y: 0.25 }}
          locations={[1, 0.5, 0]}>
          <WhiteText fontSize={16}>Total</WhiteText>
          <WhiteText fontSize={25} fontWeight={600}>
            -265 $
          </WhiteText>

          <Flex alignItems="flex-start" mt="15px">
            <TransparentBox w="50%">
              <CategoryIcon width={24} height={24} fill={colors.gray100} />
              <WhiteText fontSize={22} fontWeight={600}>
                1
              </WhiteText>
              <Text color={colors.gray400}>Categories</Text>
            </TransparentBox>
          </Flex>
        </SectionGradient>
      </View>

      <WhiteText fontSize={16} fontWeight={600} mt={25} mb={15}>
        Transactions list
      </WhiteText>

      <FlatList
        data={[{ test_id: 1 }, { texst_id: 2 }]}
        renderItem={() => <TransactionItem type="play" additionalText="1 transaction" amount={-265} />}
      />
    </GradientCententWrapper>
  );
};

export default Statistic;
