import MonthView from '@/components/calendar/month/month-view';
import TodaysActivities from '@/components/calendar/today/todays-activities';
import WeekView from '@/components/calendar/week/week-view';
import CircleButton from '@/components/ui/elements/circle-button';
import TabScreen from '@/components/ui/layout/tab-screen';
import { useActivities } from '@/context/activity-context';
import { formatDateKey } from '@/lib/utils/date-utils';
import { Feather } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { activities, fetchActivities } = useActivities();
  const todaysKey = formatDateKey(new Date());
  const selectedCount = activities[todaysKey]?.length ?? 0;
  const selectedKey = formatDateKey(selectedDate);
  const dayActivities = activities[selectedKey] ?? [];

  useFocusEffect(
    useCallback(() => {
      fetchActivities(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    }, [selectedDate, fetchActivities])
  );

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
      <View className='gap-4'>
        <MonthView
          monthDate={selectedDate}
          selectedDate={selectedDate}
          activities={activities}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />
        <WeekView
          selectedDate={selectedDate}
          activities={activities}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />
        <TodaysActivities
          selectedDate={selectedDate}
          dayActivities={dayActivities}
        />
      </View>
    </TabScreen>
  );
}