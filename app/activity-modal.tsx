import ActivityField from '@/components/calendar/activity-field'
import CircleButton from '@/components/ui/elements/circle-button'
import ModalScreen from '@/components/ui/layout/modal-screen'
import { activityMap } from '@/constants/calendar'
import { calendarApi } from '@/lib/api/calendar'
import { getErrorMessage } from '@/lib/api/client'
import { dateToDateString } from '@/lib/utils/date-utils'
import { Activity, ActivityForm } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'

// TODO: Replace useState with a shared ActivityContext to store and cache fetched activities,
// and allow state updates via handleNewActivity (add new activity to cache after creation).
// TODO: Use calendarApi.getActivityById(id) to fetch activity details when `id` is present in search params.
export default function ActivityModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [activities] = useState<Record<string, Activity[]>>(activityMap);
  const selectedActivity = id
    ? Object.values(activities)
      .flat()
      .find((activity) => activity.id === id)
    : undefined;

  const initialForm = useMemo<ActivityForm>(() => ({
    title: selectedActivity?.title ?? '',
    date: selectedActivity?.date ?? dateToDateString(new Date()),
    startTime: selectedActivity?.startTime,
    endTime: selectedActivity?.endTime,
    tag: selectedActivity?.tag ?? '',
    location: selectedActivity?.location ?? '',
    priority: selectedActivity?.priority,
    urgent: selectedActivity?.urgent ?? false,
    notes: selectedActivity?.notes ?? '',
  }), [selectedActivity]);

  const [form, setForm] = useState<ActivityForm>(initialForm);

  const updateField = useCallback(<K extends keyof ActivityForm>(key: K, value: ActivityForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  // TODO: If editing (selectedActivity exists), call calendarApi.updateActivity(id, form) instead of create.
  // TODO: Add a delete button that calls calendarApi.deleteActivity(id) when editing an existing activity.
  // TODO: Add loading/disabled state on submit button while request is in-flight to prevent double-tap.
  const handleNewActivity = async () => {
    try {
      await calendarApi.createActivity(form);
      router.back();
    } catch (error: unknown) {
      console.error('Failed to add new activity:', getErrorMessage(error));
    }
  }
  
  return (
    <ModalScreen
      title={selectedActivity ? 'Details' : 'New Activity'}
      rightSlot={
        <CircleButton
          disabled={!form.title}
          onPress={handleNewActivity}
        >
          <MaterialIcons name="done" size={18} color="#e4e4e7" />
        </CircleButton>
      }
    >
      <ActivityField form={form} updateField={updateField} />
    </ModalScreen>
  )
}