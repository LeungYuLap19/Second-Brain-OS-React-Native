import type { ActivityFormFieldProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Switch, Text, View } from 'react-native'
import AnimatedHeightView from '../../ui/animation/animated-height-view'
import SectionLabel from '../../ui/elements/section-label'
import FormFieldContainer from '../../ui/layout/form-field-container'
import PrioritySelector from './priority-selector'

export default function SettingsFields({ form, updateField }: ActivityFormFieldProps) {
  return (
    <View>
      <SectionLabel label="Settings" className="mb-0" />

      <FormFieldContainer className="flex-row items-center justify-between mt-0">
        <Pressable
          onPress={() => updateField('priority', form.priority ? undefined : 'medium')}
          className="flex-1 flex-row items-center gap-3"
        >
          <View className={`p-2 rounded-full ${form.priority ? 'bg-blue-500/20' : 'bg-zinc-800'}`}>
            <Feather
              name="flag"
              size={18}
              color={form.priority ? '#3b82f6' : '#71717a'}
            />
          </View>
          <View>
            <Text className="text-base font-medium text-zinc-200">Priority</Text>
            <Text className="text-xs text-zinc-500">Enable priority rating</Text>
          </View>
        </Pressable>
        <Switch
          value={!!form.priority}
          onValueChange={(val) => updateField('priority', val ? 'medium' : undefined)}
          trackColor={{ false: '#3f3f46', true: '#3b82f6' }}
          thumbColor={'#ffffff'}
        />
      </FormFieldContainer>

      <AnimatedHeightView height={form.priority ? 50 : 0} overflowHidden>
        <PrioritySelector
          value={form.priority ?? 'medium'}
          onChange={(priority) => updateField('priority', priority)}
        />
      </AnimatedHeightView>

      <FormFieldContainer className="flex-row items-center justify-between mt-4">
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
  )
}
