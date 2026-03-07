import { dateToDateString } from '@/lib/utils/date-utils'
import type { Activity, ActivityFieldProps, ActivityForm } from '@/types'
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, View } from 'react-native'
import { useActivityDatePicker } from '../../hooks/use-activity-date-picker'
import SectionLabel from '../ui/elements/section-label'
import ThemedDateTimePicker from '../ui/elements/themed-datetime-picker'
import ThemedTextInput from '../ui/elements/themed-text-input'
import FormFieldContainer from '../ui/layout/form-field-container'
import PrioritySelector from './priority-selector'


export default function ActivityField({ value, onChange }: ActivityFieldProps) {
  const initialValue = useMemo(
    () => ({
      title: value?.title ?? '',
      date: value?.date ?? dateToDateString(new Date()),
      startTime: value?.startTime,
      endTime: value?.endTime,
      tag: value?.tag ?? '',
      location: value?.location ?? '',
      priority: value?.priority ?? 'medium',
      urgent: value?.urgent ?? false,
      notes: value?.notes ?? '',
    }),
    [value],
  )

  const [form, setForm] = useState<ActivityForm>(initialValue)

  const updateField = <K extends keyof ActivityForm>(key: K, fieldValue: (ActivityForm)[K]) => {
    setForm((prev) => ({ ...prev, [key]: fieldValue }))
  }

  const { activePicker, setActivePicker, handleDateChange, getPickerValue } = useActivityDatePicker(form, updateField)

  useEffect(() => {
    setForm(initialValue);
  }, [initialValue])

  useEffect(() => {
    onChange?.(form);
  }, [form, onChange])

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
          {/* Title Section */}
          <View>
            <SectionLabel label="Activity Title" />
            <ThemedTextInput
              value={form.title}
              onChangeText={(text) => updateField('title', text)}
              placeholder="What needs to be done?"
              className="!text-2xl !font-semibold text-white bg-zinc-900/50 p-4 pt-2 rounded-2xl border border-zinc-800"
              style={{ minHeight: 64, textAlignVertical: 'center' }}
            />
          </View>

          {/* Details Grid */}
          <View className="gap-4">
            <SectionLabel label="Details" className="mb-0" />
            
            {/* Date Picker */}
            <FormFieldContainer padding="sm">
              <Pressable onPress={() => setActivePicker('date')} className="flex-row items-center gap-2">
                <Feather name="calendar" size={14} color="#71717a" />
                <Text className="text-xs text-zinc-500 font-medium">Date</Text>
              </Pressable>
              <Pressable onPress={() => setActivePicker('date')} className="mt-1">
                <Text className="text-base font-medium text-zinc-200">{form.date || 'Select date'}</Text>
              </Pressable>
            </FormFieldContainer>

            {/* Start / End Time */}
            <View className="flex-row gap-3">
              <FormFieldContainer padding="sm" className="flex-1">
                <Pressable onPress={() => setActivePicker('start')} className="flex-row items-center gap-2 mb-1">
                  <Feather name="clock" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Start</Text>
                </Pressable>
                <Pressable onPress={() => setActivePicker('start')}>
                  <Text className="text-base font-medium text-zinc-200">{form.startTime ?? 'Optional'}</Text>
                </Pressable>
              </FormFieldContainer>

              <FormFieldContainer padding="sm" className="flex-1">
                <Pressable onPress={() => setActivePicker('end')} className="flex-row items-center gap-2 mb-1">
                  <Feather name="clock" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">End</Text>
                </Pressable>
                <Pressable onPress={() => setActivePicker('end')}>
                  <Text className="text-base font-medium text-zinc-200">{form.endTime ?? 'Optional'}</Text>
                </Pressable>
              </FormFieldContainer>
            </View>

            <View className="flex-row gap-3">
              <FormFieldContainer padding="sm" className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="tag" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Tag</Text>
                </View>
                <ThemedTextInput
                  value={form.tag}
                  onChangeText={(text) => updateField('tag', text)}
                  placeholder="Category"
                  className="h-8"
                />
              </FormFieldContainer>

              <FormFieldContainer padding="sm" className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="map-pin" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Location</Text>
                </View>
                <ThemedTextInput
                  value={form.location}
                  onChangeText={(text) => updateField('location', text)}
                  placeholder="Add location"
                  className="h-8"
                />
              </FormFieldContainer>
            </View>
          </View>

          {/* Priority & Urgent */}
          <View>
            <SectionLabel label="Settings" className="mb-0" />
            
            <PrioritySelector 
              value={form.priority ?? 'medium'}
              onChange={(priority) => updateField('priority', priority)}
            />

            <FormFieldContainer className="flex-row items-center justify-between mt-3">
              <Pressable 
                onPress={() => updateField('urgent', !form.urgent)}
                className="flex-1 flex-row items-center gap-3"
              >
                <View className={`p-2 rounded-full ${form.urgent ? 'bg-red-500/20' : 'bg-zinc-800'}`}>
                  <Feather 
                    name="alert-circle" 
                    size={18} 
                    color={form.urgent ? '#ef4444' : '#71717a'} 
                  />
                </View>
                <View>
                  <Text className="text-base font-medium text-zinc-200">Urgent</Text>
                  <Text className="text-xs text-zinc-500">Mark as critical</Text>
                </View>
              </Pressable>
              <Switch
                value={form.urgent}
                onValueChange={(val) => updateField('urgent', val)}
                trackColor={{ false: '#3f3f46', true: '#ef4444' }}
                thumbColor={'#ffffff'}
              />
            </FormFieldContainer>
          </View>

          {/* Notes */}
          <View className="flex-1">
            <SectionLabel label="Notes" />
            <ThemedTextInput
              value={form.notes}
              onChangeText={(text) => updateField('notes', text)}
              placeholder="Add description or notes..."
              className="flex-1 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 leading-6 min-h-[120px]"
              multiline
              textAlignVertical="top"
            />
          </View>
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