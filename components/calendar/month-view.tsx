import usePagerLoop from '@/hooks/use-pager-loop';
import type { MonthViewProps } from '@/types';
import React, { useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import MonthBlock from './month-block';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const shiftDatebyMonth = (date: Date, delta: 1 | -1) => {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
};

export default function MonthView({ monthDate, selectedDate, activities, onSelectDate }: MonthViewProps) {
  const monthActivityCount = useMemo(() => {
    const targetMonth = monthDate.getMonth();
    const targetYear = monthDate.getFullYear();
    return Object.entries(activities).reduce((acc, [key, list]) => {
      const date = new Date(key);
      if (date.getMonth() === targetMonth && date.getFullYear() === targetYear) {
        return acc + (list?.length ?? 0);
      }
      return acc;
    }, 0);
  }, [activities, monthDate]);

  const [expand, setExpand] = useState(false);
  const firstOfNext = useMemo(() => shiftDatebyMonth(selectedDate, 1), [selectedDate]);
  const firstOfPrev = useMemo(() => shiftDatebyMonth(selectedDate, -1), [selectedDate]);
  const pages = [
    { key: 'prev-month', days: firstOfPrev },
    { key: 'current-month', days: selectedDate },
    { key: 'next-month', days: firstOfNext },
  ]
  
  const [pageHeights, setPageHeights] = useState<Record<number, number>>({});
  const pagerHeight = pageHeights[1];
  const animatedHeight = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  useEffect(() => {
    const nextHeight = expand ? (pagerHeight ?? 0) : 0;
    animatedHeight.value = withSpring(nextHeight, { duration: 200 });
  }, [expand, pagerHeight, animatedHeight]);

  const onPageLayout = (event: LayoutChangeEvent, pageIndex: number) => {
    const { height } = event.nativeEvent.layout;
    setPageHeights(prevHeights => ({
      ...prevHeights,
      [pageIndex]: height,
    }));
  };

  const { pagerRef, scrollEnabled, handlePageSelected } = usePagerLoop({
    currentValue: selectedDate,
    getShiftedValue: shiftDatebyMonth,
    onChange: onSelectDate,
  });

  return (
    <View className={`rounded-3xl bg-zinc-900/70 border border-zinc-800 overflow-hidden`}>
      <Pressable 
        onPress={() => setExpand(!expand)}
        className="flex-row items-center justify-between p-4 active:bg-zinc-800 rounded-t-3xl"
      >
        <Text className="text-lg font-semibold text-zinc-100">
          {`${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`}
        </Text>
        <Text className="text-xs text-zinc-400">
          {`${monthActivityCount} ${monthActivityCount === 1 ? 'activity' : 'activities'} this month`}
        </Text>
      </Pressable>
      
      <Animated.View style={animatedStyle}>
        <PagerView
          ref={pagerRef}
          initialPage={1}
          onPageSelected={handlePageSelected}
          scrollEnabled={scrollEnabled}
          style={{ flex: 1 }}
        >
          {pages.map((page, index) => (
            <View key={page.key}>
              <View
                collapsable={false}
                onLayout={event => onPageLayout(event, index)}
                style={{ alignSelf: 'flex-start' }}
              >
                <MonthBlock 
                  monthDate={page.days}
                  selectedDate={page.days}
                  activities={activities}
                  onSelectDate={onSelectDate}
                />
              </View>
            </View>
          ))}
        </PagerView>
      </Animated.View>
    </View>
  );
}
