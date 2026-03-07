import usePagerLoop from '@/hooks/use-pager-loop';
import { countWeekActivities, formatDateKey, formatRangeLabel, getWeekDays, shiftDateByDays } from '@/lib/utils/date-utils';
import type { WeekViewProps } from '@/types';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Badge from '../../ui/elements/badge';
import CardContainer from '../../ui/layout/card-container';
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
      <CardContainer className="py-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
        <View className="flex-row items-center justify-between mb-4 px-5">
          <View>
            <Text className="text-lg font-semibold text-zinc-100 mb-0.5">Weekly View</Text>
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {weekRangeLabel}
            </Text>
          </View>
          <Badge label={infoLabel} variant="neutral" size="sm" borderClassName="border border-zinc-700" className="bg-zinc-800 px-3" />
        </View>

        <PagerView
          ref={pagerRef}
          initialPage={1}
          onPageSelected={handlePageSelected}
          scrollEnabled={scrollEnabled}
          style={{ height: 72 }}
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
