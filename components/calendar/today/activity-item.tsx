import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import type { ActivityItemProps } from '@/types';

export default function ActivityItem({ activity, isSelected, onToggle }: ActivityItemProps) {
  return (
    <View className="flex-row items-center gap-3 p-3 rounded-2xl bg-zinc-950">
      <Pressable
        onPress={() => onToggle(activity.id)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        className={`w-8 h-8 rounded-full border items-center justify-center ${isSelected ? 'border-emerald-500/30 bg-emerald-500/15' : 'border-zinc-700'}`}
      >
        {isSelected ? (
          <Ionicons name="checkmark-circle-sharp" size={22} color="#10b981" />
        ) : (
          <Feather name="circle" size={18} color="#a1a1aa" />
        )}
      </Pressable>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-zinc-100">{activity.title}</Text>
        <Text className="text-xs text-zinc-400">{activity.time}</Text>
      </View>
      {activity.tag && (
        <View className="px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700">
          <Text className="text-xs text-zinc-300">{activity.tag}</Text>
        </View>
      )}
    </View>
  );
}