import usePagerLoop from '@/hooks/use-pager-loop';
import { formatDateKey, getWeekDays } from '@/lib/utils/date-utils';
import { countWeekActivities, formatRangeLabel, shiftDateByDays } from '@/lib/utils/utilities';
import type { WeekViewProps } from '@/types';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import CardContainer from '../../ui/card-container';
import TodaysActivities from '../today/todays-activities';
import WeekRow from './week-row';

export default function WeekView({ selectedDate, activities, onSelectDate }: WeekViewProps) {
  const pages = useMemo(() => {
    return [
      { key: 'prev-week', days: getWeekDays(shiftDateByDays(selectedDate, -7)) },
      { key: 'current-week', days: getWeekDays(selectedDate) },
      { key: 'next-week', days: getWeekDays(shiftDateByDays(selectedDate, 7)) },
    ];
  }, [selectedDate]);

  const currentWeekDays = pages[1].days;
  const numOfActivities = useMemo(
    () => countWeekActivities(currentWeekDays, activities),
    [currentWeekDays, activities]
  );
  const weekRangeLabel = useMemo(() => formatRangeLabel(currentWeekDays), [currentWeekDays]);
  const infoLabel = `${numOfActivities} ${numOfActivities === 1 ? 'activity' : 'activities'} this week`;

  const selectedKey = formatDateKey(selectedDate);
  const dayActivities = activities[selectedKey] ?? [];  
  
  const { pagerRef, scrollEnabled, handlePageSelected } = usePagerLoop({
    currentValue: selectedDate,
    getShiftedValue: (current, delta) => shiftDateByDays(current, delta * 7),
    onChange: onSelectDate,
  });

  return (
    <View className="gap-4">
      <CardContainer className="py-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className='px-4'>
            <Text className="text-lg font-semibold text-zinc-100">Weekly View</Text>
            <Text className="text-xs text-zinc-400">
              {weekRangeLabel}
            </Text>
          </View>
          <View className="px-4">
            <Text className="text-xs text-zinc-400">
              {infoLabel}
            </Text>
          </View>
        </View>

        <PagerView
          ref={pagerRef}
          initialPage={1}
          onPageSelected={handlePageSelected}
          scrollEnabled={scrollEnabled}
          style={{ height: 68 }}
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
      </CardContainer>

      <TodaysActivities
        selectedDate={selectedDate}
        dayActivities={dayActivities} 
      />
    </View>
  );
}
