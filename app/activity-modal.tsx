import ActivityField from '@/components/calendar/activity-field'
import CircleButton from '@/components/ui/circle-button'
import Header from '@/components/ui/header'
import ThemedView from '@/components/ui/themed-view'
import { activityMap } from '@/constants/calendar'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function ActivityModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedActivity = id
    ? Object.values(activityMap)
      .flat()
      .find((activity) => activity.id === id)
    : undefined;

  return (
    <ThemedView>
      <Header 
        title={selectedActivity ? 'Details' : 'New Activity'}
        variant='modal'
        rightSlot={
          <CircleButton>
            <MaterialIcons name="done" size={18} color="#e4e4e7" />
          </CircleButton>
        }
      />

      <View className="flex-1 px-6 pb-6">
        <ActivityField value={selectedActivity} />
      </View>
    </ThemedView>
  )
}