import type { PrioritySelectorProps } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;


export default function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <View className="flex-row gap-2 mt-2">
      {PRIORITY_OPTIONS.map((priorityOption) => {
        const isSelected = value === priorityOption;
        const colorMap = {
          low: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
          medium: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
          high: 'bg-rose-500/20 border-rose-500/50 text-rose-400',
        }[priorityOption];

        const baseColor = {
          low: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
          medium: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
          high: 'text-zinc-500 border-zinc-700 bg-zinc-800/50',
        }[priorityOption];

        return (
          <Pressable
            key={priorityOption}
            onPress={() => onChange(priorityOption)}
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
        );
      })}
    </View>
  );
}
