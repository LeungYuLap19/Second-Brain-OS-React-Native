import { useActivities } from '@/context/activity-context'
import type { ActivityFieldProps } from '@/types'
import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useActivityDatePicker } from '../../../hooks/use-activity-date-picker'
import SectionLabel from '../../ui/elements/section-label'
import ThemedDateTimePicker from '../../ui/elements/themed-datetime-picker'
import DateField from './date-field'
import NotesField from './notes-field'
import SettingsFields from './settings-fields'
import TagLocationFields from './tag-location-fields'
import TimeFields from './time-fields'
import TitleField from './title-field'

export default function ActivityField({ form, updateField, activityId }: ActivityFieldProps) {
  const { activePicker, setActivePicker, handleDateChange, getPickerValue } = useActivityDatePicker(form, updateField)
  const { activities } = useActivities()

  const overlappingActivities = useMemo(() => {
    if (!form.date || !form.startTime || !form.endTime) return [];
    
    const dayActivities = activities[form.date] || [];
    const newStartStr = form.startTime;
    const newEndStr = form.endTime;
    
    if (newStartStr >= newEndStr) return [];

    return dayActivities.filter(a => {
      if (activityId && a.id === activityId) return false;
      if (!a.startTime || !a.endTime) return false;
      
      return newStartStr < a.endTime && newEndStr > a.startTime;
    });
  }, [activities, form.date, form.startTime, form.endTime, activityId]);

  return (
    <>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
        keyboardVerticalOffset={100}
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-6">
            <TitleField form={form} updateField={updateField} />

            <View>
              <SectionLabel label="Details" />
              <View className="gap-4">
                <DateField form={form} updateField={updateField} setActivePicker={setActivePicker} />
                <TimeFields form={form} updateField={updateField} setActivePicker={setActivePicker} overlappingActivities={overlappingActivities} />
                <TagLocationFields form={form} updateField={updateField} />
              </View>
            </View>

            <SettingsFields form={form} updateField={updateField} />
            <NotesField form={form} updateField={updateField} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ThemedDateTimePicker
        isVisible={activePicker !== null}
        value={getPickerValue()}
        mode={activePicker === 'date' ? 'date' : 'time'}
        onClose={() => setActivePicker(null)}
        onChange={handleDateChange}
      />
    </>
  )
}