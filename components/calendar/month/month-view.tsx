import { calendarTheme, monthNames } from '@/constants/calendar';
import { formatDateKey, getMonthActivityCount, shiftDateByMonth } from '@/lib/utils/date-utils';
import type { MonthViewProps } from '@/types';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';
import AnimatedHeightView from '../../ui/animation/animated-height-view';
import IconCircle from '../../ui/elements/icon-circle';
import CardContainer from '../../ui/layout/card-container';

export default function MonthView({ monthDate, selectedDate, activities, onSelectDate }: MonthViewProps) {
  const monthActivityCount = useMemo(
    () => getMonthActivityCount(activities, monthDate),
    [activities, monthDate]
  );
  const title = `${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`;
  const infoLabel = `${monthActivityCount} ${monthActivityCount === 1 ? 'activity' : 'activities'} this month`;

  const [expand, setExpand] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const selectedKey = formatDateKey(selectedDate);

  const markedDates: MarkedDates = useMemo(() => {
    const marks: MarkedDates = {};
    for (const key of Object.keys(activities)) {
      if (activities[key]?.length) {
        marks[key] = { marked: true };
      }
    }
    // Merge selected state
    if (marks[selectedKey]) {
      marks[selectedKey] = { ...marks[selectedKey], selected: true };
    } else {
      marks[selectedKey] = { selected: true };
    }
    return marks;
  }, [activities, selectedKey]);

  const handleDayPress = useCallback(
    (day: DateData) => {
      const date = new Date(day.year, day.month - 1, day.day);
      onSelectDate(date);
      setExpand(false);
    },
    [onSelectDate]
  );

  const handleMonthChange = useCallback(
    (month: DateData) => {
      const date = new Date(month.year, month.month - 1, 1);
      onSelectDate(date);
    },
    [onSelectDate]
  );

  const switchMonth = (to: 'prev' | 'next') => {
    const date = shiftDateByMonth(selectedDate, to === 'prev' ? -1 : 1);
    onSelectDate(date);
  }

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) setContentHeight(height);
  }, []);

  return (
    <CardContainer className="overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-3xl">
      <Pressable
        onPress={() => setExpand(!expand)}
        className="flex-row items-center justify-between p-5 active:bg-zinc-800/50 border-b border-zinc-800/50"
      >
        <View>
          <Text className="text-lg font-semibold text-zinc-100 mb-0.5">{title}</Text>
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{infoLabel}</Text>
        </View>
        <IconCircle size="sm" bgClassName="bg-zinc-800" borderClassName="border border-zinc-700">
          <Feather name={expand ? 'chevron-up' : 'chevron-down'} size={18} color="#71717a" />
        </IconCircle>
      </Pressable>

      <AnimatedHeightView height={expand ? contentHeight : 0} springConfig={{ duration: 200 }}>
        <View 
          className='pt-4'
          onLayout={onContentLayout} 
          collapsable={false} 
          style={{ position: 'absolute', width: '100%' }}
        >
          {/* Month navigation bar */}
          <View className="flex-row items-center justify-between px-4 pb-2">
            <Pressable
              onPress={() => switchMonth('prev')}
              hitSlop={8}
              className="w-8 h-8 rounded-full bg-zinc-800/80 items-center justify-center active:bg-zinc-700 border border-zinc-700/50"
            >
              <Feather name="chevron-left" size={16} color="#a1a1aa" />
            </Pressable>
            <Text className="text-sm font-semibold text-zinc-300 tracking-wide">{title}</Text>
            <Pressable
              onPress={() => switchMonth('next')}
              hitSlop={8}
              className="w-8 h-8 rounded-full bg-zinc-800/80 items-center justify-center active:bg-zinc-700 border border-zinc-700/50"
            >
              <Feather name="chevron-right" size={16} color="#a1a1aa" />
            </Pressable>
          </View>

          <View className="px-2 pb-4">
            <Calendar
              key={formatDateKey(monthDate)}
              current={formatDateKey(monthDate)}
              onDayPress={handleDayPress}
              onMonthChange={handleMonthChange}
              markedDates={markedDates}
              enableSwipeMonths
              hideExtraDays={false}
              hideArrows
              firstDay={1}
              theme={calendarTheme}
            />
          </View>
        </View>
      </AnimatedHeightView>
    </CardContainer>
  );
}
