import { formatDateKey, isSameDay } from '@/lib/utils/date-utils';
import type { WeekRowProps } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeekRow({ days, selectedDate, activities, onSelectDate }: WeekRowProps) {
  return (
    <View className="flex-row px-4">
      {days.map((date, index) => {
        const isSelected = isSameDay(date, selectedDate);
        const hasActivities = Boolean(activities[formatDateKey(date)]?.length);

        return (
          <Pressable
            key={date.toISOString()}
            onPress={() => onSelectDate(date)}
            className={`flex-1 items-center py-3 rounded-2xl ${isSelected ? 'bg-zinc-100' : 'bg-zinc-950'}`}
            style={{ marginRight: index === days.length - 1 ? 0 : 6 }}
          >
            <Text className={`text-xs ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {weekdayLabels[index]}
            </Text>
            <Text className={`text-base font-semibold ${isSelected ? 'text-zinc-900' : 'text-zinc-200'}`}>
              {date.getDate()}
            </Text>
            {hasActivities ? (
              <View className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-zinc-900' : 'bg-red-400'} mt-1`} />
            ) : (
              <View className="w-1.5 h-1.5 rounded-full mt-1" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}