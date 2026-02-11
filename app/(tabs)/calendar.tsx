import MonthView from '@/components/calendar/month-view';
import WeekView from '@/components/calendar/week-view';
import HeaderView from '@/components/ui/header-view';
import { formatDateKey } from '@/lib/utils/date-utils';
import type { Activity } from '@/types';
import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const activityMap: Record<string, Activity[]> = {
  '2026-02-03': [
    { id: 'a1', title: 'Review onboarding flow', time: '09:30 AM', tag: 'Design' },
    { id: 'a2', title: 'Sync with backend team', time: '01:00 PM', tag: 'Meeting' },
  ],
  '2026-02-04': [
    { id: 'a3', title: 'Draft launch email', time: '10:15 AM', tag: 'Marketing' },
  ],
  '2026-02-06': [
    { id: 'a4', title: 'Ship files UI', time: '11:00 AM', tag: 'Build' },
    { id: 'a5', title: 'Agent demo', time: '04:00 PM', tag: 'Demo' },
  ],
  '2026-02-10': [
    { id: 'a6', title: 'Sprint retro', time: '03:30 PM', tag: 'Team' },
  ],
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedKey = useMemo(() => formatDateKey(selectedDate), [selectedDate]);
  const selectedCount = activityMap[selectedKey]?.length ?? 0;

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <HeaderView className="justify-between">
        <View>
          <Text className="text-2xl font-bold text-zinc-100">Calendar</Text>
          <Text className="text-xs text-zinc-400">{selectedCount} activities today</Text>
        </View>
        <View className='flex-row items-center gap-2'>
          <Pressable className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800">
            <Feather name="plus" size={18} color="#e4e4e7" />
          </Pressable>
        </View>
      </HeaderView>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 80, gap: 16 }}>
        <MonthView
          monthDate={selectedDate}
          selectedDate={selectedDate}
          activities={activityMap}
          onSelectDate={handleSelectDate}
        />
        <WeekView
          selectedDate={selectedDate}
          activities={activityMap}
          onSelectDate={handleSelectDate}
          />
      </ScrollView>
    </SafeAreaView>
  );
}