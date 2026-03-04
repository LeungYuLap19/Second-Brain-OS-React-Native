import MonthView from '@/components/calendar/month/month-view';
import WeekView from '@/components/calendar/week/week-view';
import CircleButton from '@/components/ui/elements/circle-button';
import TabScreen from '@/components/ui/layout/tab-screen';
import { activityMap } from '@/constants/calendar';
import { formatDateKey } from '@/lib/utils/date-utils';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const todaysKey = formatDateKey(new Date());
  const selectedCount = activityMap[todaysKey]?.length ?? 0;

  return (
    <TabScreen
      title="Calendar"
      subtitle={`${selectedCount} activities today`}
      rightSlot={
        <Link href={'/activity-modal'} asChild>
          <CircleButton>
            <Feather name="plus" size={18} color="#e4e4e7" />
          </CircleButton>
        </Link>
      }
    >
      <View style={{ gap: 16 }}>
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
      </View>
    </TabScreen>
  );
}