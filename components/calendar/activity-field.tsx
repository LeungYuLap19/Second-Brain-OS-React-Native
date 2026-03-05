import type { Activity, ActivityFieldProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, View } from 'react-native'
import SectionLabel from '../ui/elements/section-label'
import ThemedTextInput from '../ui/elements/themed-text-input'
import FormFieldContainer from '../ui/layout/form-field-container'

const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;
type ActivityForm = Omit<Activity, 'id'>;

export default function ActivityField({ value, onChange }: ActivityFieldProps) {
  const initialValue = useMemo(
    () => ({
      title: value?.title ?? '',
      time: value?.time ?? '',
      tag: value?.tag ?? '',
      location: value?.location ?? '',
      priority: value?.priority ?? 'medium',
      urgent: value?.urgent ?? false,
      notes: value?.notes ?? '',
    }),
    [value],
  )

  const [form, setForm] = useState<ActivityForm>(initialValue)

  useEffect(() => {
    setForm(initialValue);
  }, [initialValue])

  useEffect(() => {
    onChange?.(form);
  }, [form, onChange])

  const updateField = <K extends keyof ActivityForm>(key: K, fieldValue: (ActivityForm)[K]) => {
    setForm((prev) => ({ ...prev, [key]: fieldValue }))
  }

  const PrioritySelector = () => (
    <View className="flex-row gap-2 mt-2">
      {PRIORITY_OPTIONS.map((priorityOption) => {
        const isSelected = form.priority === priorityOption
        const colorMap = {
          low: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
          medium: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
          high: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
        }[priorityOption]

        const baseColor = {
          low: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
          medium: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
          high: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
        }[priorityOption]

        return (
          <Pressable
            key={priorityOption}
            onPress={() => updateField('priority', priorityOption)}
            className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl border ${
              isSelected ? colorMap.split(' ').slice(0, 2).join(' ') : baseColor
            }`}
          >
            <Text
              className={`text-xs font-semibold uppercase tracking-wider ${
                isSelected ? colorMap.split(' ')[2] : 'text-zinc-400'
              }`}
            >
              {priorityOption}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )

  return (
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
              className="text-2xl font-semibold text-white bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800"
            />
          </View>

          {/* Details Grid */}
          <View className="gap-4">
            <SectionLabel label="Details" className="mb-0" />
            
            <View className="flex-row gap-3">
              <FormFieldContainer padding="sm" className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="clock" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Time</Text>
                </View>
                <ThemedTextInput
                  value={form.time}
                  onChangeText={(text) => updateField('time', text)}
                  placeholder="00:00"
                  className="h-8"
                />
              </FormFieldContainer>

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
            </View>

            <FormFieldContainer padding="sm">
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

          {/* Priority & Urgent */}
          <View>
            <SectionLabel label="Settings" className="mb-0" />
            
            <PrioritySelector />

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
  )
}