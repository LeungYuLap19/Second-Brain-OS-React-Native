/* eslint-disable react-native/no-inline-styles */
import { weekdayLabels } from '@/constants/calendar';
import { formatDateKey, isSameDay } from '@/lib/utils/date-utils';
import type { WeekRowProps } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function WeekRow({ days, selectedDate, activities, onSelectDate }: WeekRowProps) {
  return (
    <View className="flex-row px-4">
      {days.map((date, index) => {
        const isSelected = isSameDay(date, selectedDate);
        const hasActivities = Boolean(activities[formatDateKey(date)]?.length);
        const isToday = isSameDay(date, new Date());

        return (
          <Pressable
            key={date.toISOString()}
            onPress={() => onSelectDate(date)}
            disabled={isSelected}
            className={`
              flex-1 items-center justify-center py-3 rounded-2xl border
              ${isSelected 
                ? 'bg-zinc-100 border-zinc-100' 
                : isToday
                  ? 'bg-zinc-800/50 border-zinc-700'
                  : 'bg-zinc-900/30 border-zinc-800'
              } 
            `}
            style={{ marginRight: index === days.length - 1 ? 0 : 8 }}
          >
            <Text className={`text-[10px] font-medium uppercase tracking-wider mb-1 ${isSelected ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {weekdayLabels[index]}
            </Text>
            <Text className={`text-lg font-semibold ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {date.getDate()}
            </Text>
            
            {
              hasActivities ? 
              <View className={`w-1 h-1 rounded-full mt-1.5 ${isSelected ? 'bg-zinc-900' : 'bg-indigo-500'}`} /> :
              <View className={`w-1 h-1 rounded-full mt-1.5`} />
            }
          </Pressable>
        );
      })}
    </View>
  );
}