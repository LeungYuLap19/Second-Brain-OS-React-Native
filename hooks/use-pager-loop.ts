import { useCallback, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

type UsePagerLoopOptions<T> = {
  currentValue: T;
  getShiftedValue: (current: T, delta: -1 | 1) => T;
  onChange: (next: T) => void;
};

export default function usePagerLoop<T>({
  currentValue,
  getShiftedValue,
  onChange,
}: UsePagerLoopOptions<T>) {
  const pagerRef = useRef<PagerView>(null);
  const isResetting = useRef(false);
  const isUserDragging = useRef(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handlePageScrollStateChanged = useCallback(
    (event: { nativeEvent: { pageScrollState: 'idle' | 'dragging' | 'settling' } }) => {
      const state = event.nativeEvent.pageScrollState;
      if (state === 'dragging') {
        isUserDragging.current = true;
      }

      if (state === 'idle' && !isResetting.current) {
        isUserDragging.current = false;
      }
    },
    []
  );

  const handlePageSelected = useCallback(
    (event: { nativeEvent: { position: number } }) => {
      if (isResetting.current) {
        isResetting.current = false;
        return;
      }

      const position = event.nativeEvent.position;

      if (!isUserDragging.current) {
        if (position !== 1) {
          pagerRef.current?.setPageWithoutAnimation(1);
        }
        return;
      }

      if (position === 1) {
        isUserDragging.current = false;
        return;
      }

      const delta: -1 | 1 = position === 0 ? -1 : 1;
      setScrollEnabled(false);
      onChange(getShiftedValue(currentValue, delta));
      isUserDragging.current = false;
      isResetting.current = true;
      setTimeout(() => {
        pagerRef.current?.setPageWithoutAnimation(1);
        setScrollEnabled(true);
      }, 0);
    },
    [currentValue, getShiftedValue, onChange]
  );

  return {
    pagerRef,
    scrollEnabled,
    handlePageScrollStateChanged,
    handlePageSelected,
  };
}
