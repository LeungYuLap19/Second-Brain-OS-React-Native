/* eslint-disable react-native/no-inline-styles */
import DotSeparator from '@/components/ui/elements/dot-separator';
import type { ActivityItemProps } from '@/types';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ActivityItem({ activity, isSelected, onToggle }: ActivityItemProps) {
  const completed = activity.completed || isSelected;

  return (
    <View className={`flex-row items-center gap-3 p-3 rounded-2xl border ${
      completed 
        ? 'bg-zinc-800 border-zinc-700' 
        : 'bg-zinc-900 border-zinc-800'
    }`}>
      <Pressable
        onPress={() => onToggle(activity.id)}
        accessibilityRole="radio"
        accessibilityState={{ checked: completed }}
        hitSlop={8}
        className={`w-10 h-10 rounded-full border items-center justify-center ${
          completed 
            ? 'border-indigo-500/50 bg-indigo-500/20' 
            : 'border-zinc-700 bg-zinc-800/50'
        }`}
      >
        {completed ? (
          <Feather name="check" size={18} color="#818cf8" />
        ) : (
          <View />
        )}
      </Pressable>
      
      <Link href={`/activity-modal?id=${activity.id}`} asChild>
        <Pressable className="flex-row items-center gap-3 flex-1">
          <View className="flex-1 gap-0.5">
            <Text 
              className={`text-base font-medium ${completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`} 
              numberOfLines={1}
            >
              {activity.title}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                <Feather name="clock" size={10} color="#71717a" />
                <Text className="text-xs text-zinc-500 font-medium">
                  {activity.startTime && activity.endTime
                    ? `${activity.startTime} – ${activity.endTime}`
                    : activity.startTime ?? activity.date}
                </Text>
              </View>
              {activity.tag && (
                <>
                  <DotSeparator />
                  <Text className="text-xs text-zinc-500 font-medium">{activity.tag}</Text>
                </>
              )}
            </View>
          </View>
          
          <Feather name="chevron-right" size={16} color="#3f3f46" />
        </Pressable>
      </Link>
    </View>
  );
}