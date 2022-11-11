import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BlackContentWrapper } from '../../common/common.styles';
import { useCurrentCard } from '../../hooks';
import { s } from './Card.styles';
import Amount from './screens/Amount/Amount';
import CardOperations from './screens/CardOperations/CardOperations';

const Card = () => {
  const carouselRef = useRef<Carousel<{ id: number }>>(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const { width } = useWindowDimensions();
  const { currentCard } = useCurrentCard();

  const moveToNextScreen = useCallback(() => {
    setScreenIndex(1);
    if (carouselRef.current) {
      carouselRef.current.snapToNext(true);
    }
  }, []);

  const screens = [{ id: 1 }, { id: 2 }];

  const renderPaginaton = useMemo(
    () => (
      <Pagination
        dotsLength={screens.length}
        activeDotIndex={screenIndex}
        carouselRef={carouselRef}
        dotStyle={s.pagination}
        inactiveDotOpacity={0.4}
        animatedDuration={0.1}
        inactiveDotScale={1}
        tappableDots={false}
      />
    ),
    [screenIndex, screens.length],
  );

  const renderItem = useCallback(
    ({ item }: { item: { id: number } }) => {
      if (item.id === 1) {
        return (
          <Amount currentCard={currentCard} renderPaginaton={renderPaginaton} moveToNextScreen={moveToNextScreen} />
        );
      }

      return <CardOperations renderPaginaton={renderPaginaton} currentCard={currentCard} />;
    },
    [currentCard, moveToNextScreen, renderPaginaton],
  );

  const onSnapToItem = (index: number) => {
    setScreenIndex(index);
  };

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
        onSnapToItem={onSnapToItem}
        useScrollView
        shouldOptimizeUpdates
        useExperimentalSnap
      />
    </BlackContentWrapper>
  );
};

export default memo(Card);
