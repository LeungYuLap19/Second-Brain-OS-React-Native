import type { ActivityFieldProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native'

const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const

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

  const [form, setForm] = useState(initialValue)

  useEffect(() => {
    setForm(initialValue)
  }, [initialValue])

  useEffect(() => {
    onChange?.(form)
  }, [form, onChange])

  const updateField = <K extends keyof typeof form>(key: K, fieldValue: (typeof form)[K]) => {
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
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Activity Title
            </Text>
            <TextInput
              value={form.title}
              onChangeText={(text) => updateField('title', text)}
              placeholder="What needs to be done?"
              placeholderTextColor="#52525b"
              className="text-2xl font-semibold text-white bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800"
            />
          </View>

          {/* Details Grid */}
          <View className="gap-4">
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
              Details
            </Text>
            
            <View className="flex-row gap-3">
              <View className="flex-1 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="clock" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Time</Text>
                </View>
                <TextInput
                  value={form.time}
                  onChangeText={(text) => updateField('time', text)}
                  placeholder="00:00"
                  placeholderTextColor="#52525b"
                  className="text-base text-zinc-200 font-medium h-8"
                />
              </View>

              <View className="flex-1 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
                <View className="flex-row items-center gap-2 mb-1">
                  <Feather name="tag" size={14} color="#71717a" />
                  <Text className="text-xs text-zinc-500 font-medium">Tag</Text>
                </View>
                <TextInput
                  value={form.tag}
                  onChangeText={(text) => updateField('tag', text)}
                  placeholder="Category"
                  placeholderTextColor="#52525b"
                  className="text-base text-zinc-200 font-medium h-8"
                />
              </View>
            </View>

            <View className="bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
              <View className="flex-row items-center gap-2 mb-1">
                <Feather name="map-pin" size={14} color="#71717a" />
                <Text className="text-xs text-zinc-500 font-medium">Location</Text>
              </View>
              <TextInput
                value={form.location}
                onChangeText={(text) => updateField('location', text)}
                placeholder="Add location"
                placeholderTextColor="#52525b"
                className="text-base text-zinc-200 font-medium h-8"
              />
            </View>
          </View>

          {/* Priority & Urgent */}
          <View>
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
              Settings
            </Text>
            
            <PrioritySelector />

            <View className="flex-row items-center justify-between bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 mt-3">
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
            </View>
          </View>

          {/* Notes */}
          <View className="flex-1">
            <Text className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Notes
            </Text>
            <TextInput
              value={form.notes}
              onChangeText={(text) => updateField('notes', text)}
              placeholder="Add description or notes..."
              placeholderTextColor="#52525b"
              className="flex-1 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 text-zinc-200 text-base leading-6 min-h-[120px]"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}