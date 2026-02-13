import MonthView from '@/components/calendar/month/month-view';
import WeekView from '@/components/calendar/week/week-view';
import CircleButton from '@/components/ui/circle-button';
import Header from '@/components/ui/header';
import ThemedSafeAreaView from '@/components/ui/themed-safe-area-view';
import { activityMap } from '@/constants/calendar';
import { formatDateKey } from '@/lib/utils/date-utils';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const todaysKey = formatDateKey(new Date());
  const selectedCount = activityMap[todaysKey]?.length ?? 0;

  return (
    <ThemedSafeAreaView>
      <Header
        title="Calendar"
        subtitle={`${selectedCount} activities today`}
        rightSlot={
          <Link href={'/activity-modal'} asChild>
            <CircleButton>
              <Feather name="plus" size={18} color="#e4e4e7" />
            </CircleButton>
          </Link>
        }
      />

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
    </ThemedSafeAreaView>
  );
}