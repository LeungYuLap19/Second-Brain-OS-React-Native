/* eslint-disable react-native/no-inline-styles */
import { weekdayLabels } from '@/constants/calendar';
import { formatDateKey, getMonthMatrix, isSameDay } from '@/lib/utils/date-utils';
import type { MonthBlockProps } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function MonthBlock({ monthDate, selectedDate, activities, onSelectDate, setExpand }: MonthBlockProps) {
  const weeks = getMonthMatrix(monthDate);

  return (
    <View className="flex-col justify-start overflow-hidden px-4 pb-4">
      <View className="flex-row mb-3 pb-2 border-b border-zinc-800">
        {weekdayLabels.map((label, index) => (
          <View key={index} className="items-center" style={{ width: `${100 / 7}%` }}>
            <Text className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{label}</Text>
          </View>
        ))}
      </View>
      
      {weeks.map((week, weekIndex) => (
        <View key={`week-${weekIndex}`} className="flex-row">
          {week.map(({ date, isCurrentMonth }) => {
            const hasActivities = Boolean(activities[formatDateKey(date)]?.length);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());

            return (
              <Pressable
                key={date.toISOString()}
                onPress={() => {
                  onSelectDate(date);
                  setExpand(false);
                }}
                className="items-center justify-center py-2"
                style={{ width: `${100 / 7}%` }}
                disabled={!isCurrentMonth}
              >
                <View
                  className={`
                    w-9 h-9 rounded-2xl items-center justify-center 
                    ${isSelected 
                      ? 'bg-zinc-100' 
                      : isToday 
                        ? 'bg-zinc-800 border-zinc-700' 
                        : ''
                    }
                  `}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected
                        ? 'text-zinc-900'
                          : isCurrentMonth
                            ? 'text-zinc-400'
                            : 'text-zinc-700'
                    }`}
                  >
                    {date.getDate()}
                  </Text>
                  
                  {hasActivities && !isSelected && (
                    <View className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}