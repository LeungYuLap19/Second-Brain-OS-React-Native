import type { ActivityItemProps } from '@/types';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ActivityItem({ activity, isSelected, onToggle }: ActivityItemProps) {
  return (
    <View className="flex-row items-center gap-3 p-3 rounded-2xl bg-zinc-950">
      <Pressable
        onPress={() => onToggle(activity.id)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        className={`w-9 h-9 rounded-full border items-center justify-center ${isSelected ? 'border-emerald-500/30 bg-emerald-500/15' : 'border-zinc-700'}`}
      >
        {isSelected ? (
          <Ionicons name="checkmark-circle-sharp" size={24} color="#10b981" />
        ) : (
          <Feather name="circle" size={22} color="#a1a1aa" />
        )}
      </Pressable>
      <Link href={'/activity-modal'} asChild>
        <Pressable className='flex-row items-center gap-2 flex-1'>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-zinc-100" numberOfLines={1}>{activity.title}</Text>
            <Text className="text-xs text-zinc-400">{activity.time}</Text>
          </View>
          {activity.tag && (
            <View className="px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 flex-shrink-0">
              <Text className="text-xs text-zinc-300">{activity.tag}</Text>
            </View>
          )}
        </Pressable>
      </Link>
      
    </View>
  );
}