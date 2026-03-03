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
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handlePageSelected = useCallback(
    (event: { nativeEvent: { position: number } }) => {
      if (isResetting.current) {
        isResetting.current = false;
        return;
      }

      const position = event.nativeEvent.position;
      if (position === 1) {
        return;
      }

      const delta: -1 | 1 = position === 0 ? -1 : 1;
      setScrollEnabled(false);
      onChange(getShiftedValue(currentValue, delta));
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
    handlePageSelected,
  };
}
