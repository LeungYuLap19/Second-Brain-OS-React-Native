import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ViewToggleProps {
  value: 'week' | 'month';
  onChange: (value: 'week' | 'month') => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <View className="flex-row bg-zinc-900 border border-zinc-800 rounded-full p-1">
      {(['week', 'month'] as const).map((option) => {
        const isActive = value === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            className={`px-4 py-2 rounded-full ${isActive ? 'bg-zinc-100' : 'bg-transparent'}`}
          >
            <Text className={`text-sm font-semibold ${isActive ? 'text-zinc-900' : 'text-zinc-300'}`}>
              {option === 'week' ? 'Week' : 'Month'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
