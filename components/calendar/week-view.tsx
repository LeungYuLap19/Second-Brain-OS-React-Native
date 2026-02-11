import usePagerLoop from '@/hooks/use-pager-loop';
import { formatDateKey, getWeekDays } from '@/lib/utils/date-utils';
import type { WeekViewProps } from '@/types';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import TodaysActivities from './todays-activities';
import WeekRow from './week-row';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const shiftDateByDays = (date: Date, delta: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + delta);
  return next;
};

export default function WeekView({ selectedDate, activities, onSelectDate }: WeekViewProps) {
  const currentWeekDays = getWeekDays(selectedDate);
  const prevWeekDays = useMemo(() => getWeekDays(shiftDateByDays(selectedDate, -7)), [selectedDate]);
  const nextWeekDays = useMemo(() => getWeekDays(shiftDateByDays(selectedDate, 7)), [selectedDate]);
  const pages = [
    { key: 'prev-week', days: prevWeekDays },
    { key: 'current-week', days: currentWeekDays },
    { key: 'next-week', days: nextWeekDays },
  ];

  const selectedKey = formatDateKey(selectedDate);
  const dayActivities = activities[selectedKey] ?? [];
  const numOfActivities = currentWeekDays.reduce((acc, value) => {
    const key = formatDateKey(value);
    return acc + (activities[key]?.length ?? 0);
  }, 0);
  const { pagerRef, scrollEnabled, handlePageSelected } = usePagerLoop({
    currentValue: selectedDate,
    getShiftedValue: (current, delta) => shiftDateByDays(current, delta * 7),
    onChange: onSelectDate,
  });

  return (
    <View className="gap-4">
      <View className="py-4 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <View className='px-4'>
            <Text className="text-lg font-semibold text-zinc-100">Weekly View</Text>
            <Text className="text-xs text-zinc-400">
              {`${monthNames[currentWeekDays[0].getMonth()]} ${currentWeekDays[0].getDate()} - ${monthNames[currentWeekDays[6].getMonth()]} ${currentWeekDays[6].getDate()}`}
            </Text>
          </View>
          <View className="px-4">
            <Text className="text-xs text-zinc-400">
              {`${numOfActivities} ${numOfActivities === 1 ? 'activity' : 'activities'} this week`}
            </Text>
          </View>
        </View>

        <PagerView
          ref={pagerRef}
          initialPage={1}
          onPageSelected={handlePageSelected}
          scrollEnabled={scrollEnabled}
          style={{ height: 66 }}
        >
          {
            pages.map(page => (
              <WeekRow
                key={page.key}
                days={page.days}
                selectedDate={selectedDate}
                activities={activities}
                onSelectDate={onSelectDate}
              />
            ))
          }
        </PagerView>
      </View>

      <TodaysActivities 
        selectedDate={selectedDate}
        dayActivities={dayActivities} 
      />
    </View>
  );
}
