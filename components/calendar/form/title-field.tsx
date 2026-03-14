import type { ActivityFormFieldProps } from '@/types'
import React from 'react'
import { View } from 'react-native'
import SectionLabel from '../../ui/elements/section-label'
import ThemedTextInput from '../../ui/elements/themed-text-input'

export default function TitleField({ form, updateField }: ActivityFormFieldProps) {
  return (
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
  )
}
