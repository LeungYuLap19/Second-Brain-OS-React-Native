import type { ActivityFormFieldProps, PickerType } from '@/types'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text } from 'react-native'
import FormFieldContainer from '../../ui/layout/form-field-container'

interface DateFieldProps extends ActivityFormFieldProps {
  setActivePicker: (picker: PickerType) => void
}

export default function DateField({ form, setActivePicker }: DateFieldProps) {
  return (
    <FormFieldContainer padding="sm" className="gap-2">
      <Pressable onPress={() => setActivePicker('date')} className="flex-row items-center gap-2">
        <Feather name="calendar" size={14} color="#71717a" />
        <Text className="text-xs text-zinc-500 font-medium">Date</Text>
      </Pressable>
      <Pressable onPress={() => setActivePicker('date')} className="mt-1">
        <Text className="text-base font-medium text-zinc-200">{form.date || 'Select date'}</Text>
      </Pressable>
    </FormFieldContainer>
  )
}
