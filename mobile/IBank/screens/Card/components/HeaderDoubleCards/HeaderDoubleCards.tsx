import { Center, ChevronDownIcon, Fade } from 'native-base';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { isEqual } from 'lodash';
import { colors } from '../../../../config/colors';
import { IconRoundBlock, ScrollBlock } from './HeaderDoubleCards.styles';
import { cardEnum } from '../../../../config/screens';
import { NCardNavigatorNavigationProp } from '../../../../navigation/types/CardNavigator.types';
import { DoubleCards } from '../../../../assets/svg';
import { useScrollHandler } from '../../../../hooks';

const HeaderDoubleCards = () => {
  const { navigate } = useNavigation<NCardNavigatorNavigationProp<'HeaderModal'>>();
  const scrollHandler = useScrollHandler({ onScrollDown: () => navigate(cardEnum.HeaderModal) });

  return (
    <ScrollBlock scrollEventThrottle={16} onScroll={scrollHandler}>
      <Fade in>
        <Center mt={35}>
          <IconRoundBlock onPress={() => navigate(cardEnum.HeaderModal)}>
            <DoubleCards width={18} height={18} />
          </IconRoundBlock>
          <ChevronDownIcon mt="5px" size={18} color={colors.gray500} />
        </Center>
      </Fade>
    </ScrollBlock>
  );
};

export default memo(HeaderDoubleCards, isEqual);
