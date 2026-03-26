import ActivityField from '@/components/calendar/form/activity-field'
import CircleButton from '@/components/ui/elements/circle-button'
import ModalScreen from '@/components/ui/layout/modal-screen'
import { useActivities } from '@/context/activity-context'
import { getErrorMessage } from '@/lib/api/clients/base-client'
import { dateToDateString } from '@/lib/utils/date-utils'
import { ActivityForm } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'

export default function ActivityModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { activities, createActivity, updateActivity } = useActivities();
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

  const handleSubmit = async () => {
    try {
      if (selectedActivity && id) {
        await updateActivity(id, form);
      } else {
        await createActivity(form);
      }
      router.back();
    } catch (error: unknown) {
      console.error('Failed to save activity:', getErrorMessage(error));
    }
  }
  
  return (
    <ModalScreen
      title={selectedActivity ? 'Details' : 'New Activity'}
      rightSlot={
        <CircleButton
          disabled={!form.title}
          onPress={handleSubmit}
        >
          <MaterialIcons name="done" size={18} color="#e4e4e7" />
        </CircleButton>
      }
    >
      <ActivityField form={form} updateField={updateField} activityId={id} />
    </ModalScreen>
  )
}