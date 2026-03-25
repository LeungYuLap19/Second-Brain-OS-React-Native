import useAnimatedHeight from '@/hooks/use-animated-height'
import { formatTime } from '@/lib/utils/date-utils'
import type { TimeFieldsProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import AnimatedHeightView from '../../ui/animation/animated-height-view'
import FormFieldContainer from '../../ui/layout/form-field-container'

export default function TimeFields({ form, updateField, setActivePicker, overlappingActivities }: TimeFieldsProps) {
  const { contentHeight, onLayout, animatedViewProps } = useAnimatedHeight({ overflowHidden: true });
  const hasOverlap = overlappingActivities.length > 0;

  const clearTimes = () => {
    updateField('startTime', undefined)
    updateField('endTime', undefined)
  }

  return (
    <View>
      <View className="flex-row gap-3">
        <FormFieldContainer padding="sm" className="flex-1 gap-2">
          <View className="flex-row items-center justify-between mb-1">
            <Pressable onPress={() => setActivePicker('start')} className="flex-row items-center gap-2">
              <Feather name="clock" size={14} color="#71717a" />
              <Text className="text-xs text-zinc-500 font-medium">Start</Text>
            </Pressable>
            {form.startTime && (
              <Pressable onPress={clearTimes} hitSlop={8}>
                <Feather name="x" size={14} color="#71717a" />
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => setActivePicker('start')}>
            <Text className="text-base font-medium text-zinc-200">{form.startTime ? formatTime(form.startTime) : 'Optional'}</Text>
          </Pressable>
        </FormFieldContainer>

        <FormFieldContainer padding="sm" className="flex-1 gap-2">
          <View className="flex-row items-center justify-between mb-1">
            <Pressable onPress={() => setActivePicker('end')} className="flex-row items-center gap-2">
              <Feather name="clock" size={14} color="#71717a" />
              <Text className="text-xs text-zinc-500 font-medium">End</Text>
            </Pressable>
            {form.endTime && (
              <Pressable onPress={clearTimes} hitSlop={8}>
                <Feather name="x" size={14} color="#71717a" />
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => setActivePicker('end')}>
            <Text className="text-base font-medium text-zinc-200">{form.endTime ? formatTime(form.endTime) : 'Optional'}</Text>
          </Pressable>
        </FormFieldContainer>
      </View>

      <AnimatedHeightView {...animatedViewProps} height={hasOverlap ? contentHeight : 0}>
        <View onLayout={onLayout} collapsable={false} style={{ position: 'absolute', width: '100%' }}>
        <View className="mt-4 bg-red-500/10 rounded-2xl p-3 border border-red-500/20">
          <View className="flex-row items-center gap-2 mb-2">
            <Feather name="alert-triangle" size={14} color="#ef4444" />
            <Text className="text-xs font-semibold text-red-400">Time Overlap Detected</Text>
          </View>
          {overlappingActivities.map((activity, index) => (
            <View
              key={activity.id}
              style={{ height: 40, marginBottom: index === overlappingActivities.length - 1 ? 0 : 8 }}
              className="flex-row items-center bg-zinc-900/50 rounded-lg px-3 border border-zinc-800"
            >
              <Text className="text-sm font-medium text-zinc-300 flex-1" numberOfLines={1}>
                {activity.title}
              </Text>
              <Text className="text-xs text-zinc-500 ml-2">
                {formatTime(activity.startTime!)} - {formatTime(activity.endTime!)}
              </Text>
            </View>
          ))}
        </View>
        </View>
      </AnimatedHeightView>
    </View>
  )
}
