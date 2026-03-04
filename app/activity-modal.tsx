import ActivityField from '@/components/calendar/activity-field'
import CircleButton from '@/components/ui/elements/circle-button'
import ModalScreen from '@/components/ui/layout/modal-screen'
import { activityMap } from '@/constants/calendar'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function ActivityModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedActivity = id
    ? Object.values(activityMap)
      .flat()
      .find((activity) => activity.id === id)
    : undefined;

  return (
    <ModalScreen
      title={selectedActivity ? 'Details' : 'New Activity'}
      rightSlot={
        <CircleButton>
          <MaterialIcons name="done" size={18} color="#e4e4e7" />
        </CircleButton>
      }
    >
      <ActivityField value={selectedActivity} />
    </ModalScreen>
  )
}