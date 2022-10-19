import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Flex, Text, View } from 'native-base';
import { GradientCententWrapper, SectionGradient, TransparentBox, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';
import CalendarPiker from './components/CalendarPiker/CalendarPiker';
import { CategoryIcon } from '../../assets/svg';
import { CardPicker, TransactionItem } from '../../components';

const Statistic = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkBlue, shadowColor: colors.darkBlue } });
  }, [setOptions]);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListFooterComponent={() => (
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

          {/* Categories */}
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
                  <CategoryIcon />
                  <WhiteText fontSize={22} fontWeight={600}>
                    1
                  </WhiteText>
                  <Text color={colors.gray400}>Categories</Text>
                </TransparentBox>
              </Flex>
            </SectionGradient>
          </View>

          {/* Transactions */}
          <WhiteText fontSize={16} fontWeight={600} mt={25} mb={15}>
            Transactions list
          </WhiteText>

          <FlatList
            listKey="transaction_key"
            keyExtractor={(item, index) => `_key${item.texst_id}${index.toString()}`}
            data={[{ test_id: 1 }, { texst_id: 2 }, { texst_id: 3 }, { texst_id: 4 }, { texst_id: 5 }, { texst_id: 6 }]}
            renderItem={() => <TransactionItem type="play" additionalText="1 transaction" amount={-265} />}
          />
        </GradientCententWrapper>
      )}
    />
  );
};

export default Statistic;
