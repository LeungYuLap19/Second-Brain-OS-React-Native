import AnimatedHeightView from '@/components/ui/animated-height-view';
import CardContainer from '@/components/ui/card-container';
import { monthNames } from '@/constants/calendar';
import usePagerLoop from '@/hooks/use-pager-loop';
import { getMonthActivityCount, shiftDateByMonth } from '@/lib/utils/utilities';
import type { MonthViewProps } from '@/types';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import MonthBlock from './month-block';

export default function MonthView({ monthDate, selectedDate, activities, onSelectDate }: MonthViewProps) {
  const pages = useMemo(() => {
    return [
      { key: 'prev-month', days: shiftDateByMonth(selectedDate, -1) },
      { key: 'current-month', days: selectedDate },
      { key: 'next-month', days: shiftDateByMonth(selectedDate, 1) },
    ];
  }, [selectedDate]);
  
  const monthActivityCount = useMemo(() => {
    return getMonthActivityCount(activities, monthDate)
  }, [activities, monthDate]);
  const title = `${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`;
  const infoLabel = `${monthActivityCount} ${monthActivityCount === 1 ? 'activity' : 'activities'} this month`;

  const [expand, setExpand] = useState(false);
  const [pageHeights, setPageHeights] = useState<Record<number, number>>({});
  const pagerHeight = pageHeights[1] ?? 0;
  const containerHeight = expand ? pagerHeight : 0;

  const onPageLayout = (event: LayoutChangeEvent, pageIndex: number) => {
    const { height } = event.nativeEvent.layout;
    setPageHeights(prevHeights => ({
      ...prevHeights,
      [pageIndex]: height,
    }));
  };

  const { pagerRef, scrollEnabled, handlePageSelected } = usePagerLoop({
    currentValue: selectedDate,
    getShiftedValue: shiftDateByMonth,
    onChange: onSelectDate,
  });

  return (
    <CardContainer className="overflow-hidden">
      <Pressable 
        onPress={() => setExpand(!expand)}
        className="flex-row items-center justify-between p-4 active:bg-zinc-800 rounded-t-3xl"
      >
        <Text className="text-lg font-semibold text-zinc-100">
          {title}
        </Text>
        <Text className="text-xs text-zinc-400">
          {infoLabel}
        </Text>
      </Pressable>
      
      <AnimatedHeightView height={containerHeight} springConfig={{ duration: 200 }}>
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
                  setExpand={setExpand}
                />
              </View>
            </View>
          ))}
        </PagerView>
      </AnimatedHeightView>
    </CardContainer>
  );
}
