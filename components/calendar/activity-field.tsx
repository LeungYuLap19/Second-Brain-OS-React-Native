import type { ActivityFieldProps } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

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

  return (
    <View className="flex-1">
      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center gap-3'>
          <Text className='text-sm font-medium text-zinc-400 w-20'>Title</Text>
          <TextInput
            value={form.title}
            onChangeText={(text) => updateField('title', text)}
            placeholder='What are you doing?'
            placeholderTextColor='#71717a'
            className='flex-1 text-zinc-100 py-1'
          />
        </View>
      </View>

      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center gap-3'>
          <Text className='text-sm font-medium text-zinc-400 w-20'>Time</Text>
          <TextInput
            value={form.time}
            onChangeText={(text) => updateField('time', text)}
            placeholder='e.g. 09:30 AM'
            placeholderTextColor='#71717a'
            className='flex-1 text-zinc-100 py-1'
          />
        </View>
      </View>

      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center gap-3'>
          <Text className='text-sm font-medium text-zinc-400 w-20'>Tag</Text>
          <TextInput
            value={form.tag}
            onChangeText={(text) => updateField('tag', text)}
            placeholder='Design / Meeting / Build'
            placeholderTextColor='#71717a'
            className='flex-1 text-zinc-100 py-1'
          />
        </View>
      </View>

      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center gap-3'>
          <Text className='text-sm font-medium text-zinc-400 w-20'>Location</Text>
          <TextInput
            value={form.location}
            onChangeText={(text) => updateField('location', text)}
            placeholder='Where will this happen?'
            placeholderTextColor='#71717a'
            className='flex-1 text-zinc-100 py-1'
          />
        </View>
      </View>

      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm font-medium text-zinc-400 w-20'>Priority</Text>
          <View className='flex-1 flex-row gap-2 justify-end'>
            {PRIORITY_OPTIONS.map((priorityOption) => {
              const isSelected = form.priority === priorityOption

              return (
                <Pressable
                  key={priorityOption}
                  onPress={() => updateField('priority', priorityOption)}
                  className={`px-3 py-1.5 rounded-full border ${
                    isSelected ? 'bg-zinc-700 border-zinc-600' : 'bg-transparent border-zinc-700'
                  }`}
                >
                  <Text className='text-xs capitalize text-zinc-200'>{priorityOption}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </View>

      <View className='py-3 border-b border-zinc-800'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm font-medium text-zinc-400'>Urgent</Text>
          <Pressable
            onPress={() => updateField('urgent', !form.urgent)}
            className={`px-3 py-1.5 rounded-full border ${
              form.urgent ? 'bg-zinc-700 border-zinc-600' : 'bg-transparent border-zinc-700'
            }`}
          >
            <Text className='text-xs text-zinc-200'>{form.urgent ? 'Yes' : 'No'}</Text>
          </Pressable>
        </View>
      </View>

      <View className='py-3'>
        <Text className='text-sm font-medium text-zinc-400 mb-2'>Notes</Text>
        <TextInput
          value={form.notes}
          onChangeText={(text) => updateField('notes', text)}
          placeholder='Add context for this activity...'
          placeholderTextColor='#71717a'
          className='text-zinc-100 max-h-80'
          multiline
          textAlignVertical='top'
        />
      </View>
    </View>
  )
}