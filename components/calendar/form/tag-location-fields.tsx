import type { ActivityFormFieldProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import ThemedTextInput from '../../ui/elements/themed-text-input'
import FormFieldContainer from '../../ui/layout/form-field-container'

export default function TagLocationFields({ form, updateField }: ActivityFormFieldProps) {
  return (
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
  )
}
