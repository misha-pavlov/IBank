import { Center, ChevronDownIcon } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../config/colors';
import { IconRoundBlock, ScrollBlock } from './HeaderDoubleCards.styles';
import { screens } from '../../../../config/screens';
import { NAppNavigatorNavigationProp } from '../../../../navigation/types/AppNavigator.types';
import { DoubleCards } from '../../../../assets/svg';
import { useScrollHandler } from '../../../../hooks';

const HeaderDoubleCards = () => {
  const { navigate } = useNavigation<NAppNavigatorNavigationProp<'HeaderModal'>>();
  const scrollHandler = useScrollHandler({ onScrollDown: () => navigate(screens.app.HeaderModal) });

  return (
    <ScrollBlock scrollEventThrottle={16} onScroll={scrollHandler}>
      <Center mt={35}>
        <IconRoundBlock onPress={() => navigate(screens.app.HeaderModal)}>
          <DoubleCards width={18} height={18} />
        </IconRoundBlock>
        <ChevronDownIcon mt="5px" size={18} color={colors.gray500} />
      </Center>
    </ScrollBlock>
  );
};

export default HeaderDoubleCards;
