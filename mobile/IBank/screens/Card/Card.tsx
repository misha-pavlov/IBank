import { View } from 'native-base';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BlackContentWrapper } from '../../common/common.styles';
import { s } from './Card.styles';
import Amount from './screens/Amount/Amount';
import CardOperation from './screens/CardOperation/CardOperation';

const Card = () => {
  const carouselRef = useRef(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const { width } = useWindowDimensions();

  const screens = [{ id: 1 }, { id: 2 }];

  const renderItem = useCallback(({ item }: { item: { id: number } }) => {
    if (item.id === 1) {
      return <Amount />;
    }

    return <CardOperation />;
  }, []);

  const renderPaginaton = useMemo(
    () => (
      <View position="absolute" top="70%" left={0} right={0}>
        <Pagination
          dotsLength={screens.length}
          activeDotIndex={screenIndex}
          carouselRef={carouselRef}
          dotStyle={s.pagination}
          inactiveDotOpacity={0.4}
          animatedDuration={0.1}
          inactiveDotScale={0.6}
          tappableDots={false}
        />
      </View>
    ),
    [screenIndex, screens.length],
  );

  return (
    <BlackContentWrapper withoutPadding>
      <Carousel
        vertical={false}
        layoutCardOffset={9}
        ref={carouselRef}
        data={screens}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideShift={0}
        onSnapToItem={(index: number) => setScreenIndex(index)}
        useScrollView
        shouldOptimizeUpdates
        useExperimentalSnap
      />

      {renderPaginaton}
    </BlackContentWrapper>
  );
};

export default Card;
