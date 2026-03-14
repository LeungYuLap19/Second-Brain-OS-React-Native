import type { ActivityFormFieldProps } from '@/types'
import React from 'react'
import { View } from 'react-native'
import SectionLabel from '../../ui/elements/section-label'
import ThemedTextInput from '../../ui/elements/themed-text-input'

export default function NotesField({ form, updateField }: ActivityFormFieldProps) {
  return (
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
  )
}
