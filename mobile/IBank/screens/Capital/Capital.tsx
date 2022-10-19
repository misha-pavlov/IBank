import { useNavigation } from '@react-navigation/native';
import { Stack, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { BagIcon } from '../../assets/svg';
import { BlackCard, IronCard, PinkCard } from '../../common/cards';
import { GradientCententWrapper, SectionGradient, TransparentBox, WhiteText } from '../../common/common.styles';
import { colors } from '../../config/colors';

const Capital = () => {
  const { width } = useWindowDimensions();
  const { setOptions } = useNavigation();
  const transparentBoxWidth = width * 0.4;

  useEffect(() => {
    setOptions({ headerStyle: { backgroundColor: colors.darkGreen, shadowColor: colors.darkGreen } });
  }, [setOptions]);

  return (
    <GradientCententWrapper
      colors={[colors.darkGreen, colors.darkGreen1, colors.darkGreen1]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 0.7, y: 0.25 }}
      locations={[1, 0.5, 0]}>
      <WhiteText fontSize={20} fontWeight={600} mb="20px">
        Capital
      </WhiteText>

      <SectionGradient
        colors={[colors.darkGreen2, colors.darkGreen3, colors.darkGreen4]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 0.7, y: 0.25 }}
        locations={[1, 0.5, 0]}>
        <View alignItems="flex-start">
          <View backgroundColor={colors.aqua} p="8px" mb="10px" borderRadius={50}>
            <BagIcon width={25} height={25} />
          </View>
        </View>

        <WhiteText fontSize={16}>Sum</WhiteText>
        <WhiteText fontSize={25} fontWeight={600}>
          29.72 $
        </WhiteText>
      </SectionGradient>

      {/* use TransparentBox in map and don't add mr="12%" and mb="12%" in every second block */}
      <Stack direction="row" flexWrap="wrap" mt={25}>
        <TransparentBox
          w={transparentBoxWidth}
          height={transparentBoxWidth - 20}
          justifyContent="center"
          p={24}
          mr="12%"
          mb="12%">
          <BlackCard size={45} />
          <Text color={colors.blueGray500}>Card type</Text>
          <WhiteText fontWeight={600} fontSize={20}>
            22.72 $
          </WhiteText>
        </TransparentBox>

        <TransparentBox w={transparentBoxWidth} height={transparentBoxWidth - 20} justifyContent="center" p={24}>
          <PinkCard size={45} />
          <Text color={colors.blueGray500}>Card type</Text>
          <WhiteText fontWeight={600} fontSize={20}>
            22.72 $
          </WhiteText>
        </TransparentBox>

        <TransparentBox
          w={transparentBoxWidth}
          height={transparentBoxWidth - 20}
          justifyContent="center"
          p={24}
          mr="12%"
          mb="12%">
          <IronCard size={45} />
          <Text color={colors.blueGray500}>Card type</Text>
          <WhiteText fontWeight={600} fontSize={20}>
            22.72 $
          </WhiteText>
        </TransparentBox>
      </Stack>
    </GradientCententWrapper>
  );
};

export default Capital;
