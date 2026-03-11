import MonthView from '@/components/calendar/month/month-view';
import WeekView from '@/components/calendar/week/week-view';
import CircleButton from '@/components/ui/elements/circle-button';
import TabScreen from '@/components/ui/layout/tab-screen';
import { calendarApi } from '@/lib/api/calendar';
import { getErrorMessage } from '@/lib/api/client';
import { formatDateKey } from '@/lib/utils/date-utils';
import { ActivityMap } from '@/types';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// TODO: Replace local state with shared ActivityContext (same context used by activity-modal).
// TODO: Re-fetch activities when returning from activity-modal (e.g. useFocusEffect) so new/edited entries appear.
// TODO: Add loading state while fetching activities.
// TODO: Add pull-to-refresh to re-fetch activities.
// TODO: Navigate to activity-modal with activity id when tapping an activity in WeekView.
export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activities, setActivities] = useState<ActivityMap>({});
  const todaysKey = formatDateKey(new Date());
  const selectedCount = activities[todaysKey]?.length ?? 0;

  const retrieveActivities = async () => {
    try {
      const data = await calendarApi.getActivitiesByMonth(
        selectedDate.getFullYear(), 
        selectedDate.getMonth() + 1
      );
      setActivities(data);
    } catch (error: unknown) {
      console.error('Failed to retrieve activities:', getErrorMessage(error));
    }
  }

  useEffect(() => {
    retrieveActivities();
  }, [selectedDate]);

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
          activities={activities}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />
        <WeekView
          selectedDate={selectedDate}
          activities={activities}
          onSelectDate={(date: Date) => setSelectedDate(date)}
        />
      </View>
    </TabScreen>
  );
}