import MonthView from '@/components/calendar/month/month-view';
import WeekView from '@/components/calendar/week/week-view';
import HeaderView from '@/components/ui/header-view';
import { activityMap } from '@/constants/calendar';
import { formatDateKey } from '@/lib/utils/date-utils';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const todaysKey = formatDateKey(new Date());
  const selectedCount = activityMap[todaysKey]?.length ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <HeaderView className="justify-between">
        <View>
          <Text className="text-2xl font-bold text-zinc-100">Calendar</Text>
          <Text className="text-xs text-zinc-400">{selectedCount} activities today</Text>
        </View>
        <Link href={'/activity-modal'} asChild>
          <Pressable className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800">
            <Feather name="plus" size={18} color="#e4e4e7" />
          </Pressable>
        </Link>
      </HeaderView>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 80, gap: 16 }}>
        <MonthView
          monthDate={selectedDate}
          selectedDate={selectedDate}
          activities={activityMap}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />
        <WeekView
          selectedDate={selectedDate}
          activities={activityMap}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />

      </ScrollView>
    </SafeAreaView>
  );
}