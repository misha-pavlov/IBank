import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { isFunction } from 'lodash';

const useScrollHandler = ({ onScrollDown, onScrollTop }: { onScrollDown?: () => void; onScrollTop?: () => void }) => {
  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value && isFunction(onScrollDown)) {
        translateY.value = 0;
        onScrollDown();
      } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value && isFunction(onScrollTop)) {
        translateY.value = 100;
        onScrollTop();
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  return scrollHandler;
};

export default useScrollHandler;
