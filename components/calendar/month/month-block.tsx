import { weekdayLabels } from '@/constants/calendar';
import { formatDateKey, getMonthMatrix, isSameDay } from '@/lib/utils/date-utils';
import type { MonthBlockProps } from '@/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function MonthBlock({ monthDate, selectedDate, activities, onSelectDate, setExpand }: MonthBlockProps) {
  const weeks = getMonthMatrix(monthDate);

  return (
    <View className={`flex-col justify-start overflow-hidden p-4`}>
      <View className="flex-row mb-2">
        {weekdayLabels.map((label, index) => (
          <View key={index} className="items-center" style={{ width: `${100 / 7}%` }}>
            <Text className="text-xs text-zinc-500">{label}</Text>
          </View>
        ))}
      </View>
      
      {weeks.map((week, weekIndex) => (
        <View key={`week-${weekIndex}`} className="flex-row">
          {week.map(({ date, isCurrentMonth }) => {
            const hasActivities = Boolean(activities[formatDateKey(date)]?.length);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            const isTodayInMonth = isToday && isCurrentMonth;

            return (
              <Pressable
                key={date.toISOString()}
                onPress={() => {
                  onSelectDate(date);
                  setExpand(false);
                }}
                className="items-center justify-center py-3"
                style={{ width: `${100 / 7}%` }}
                disabled={!isCurrentMonth}
              >
                <View
                  className={`
                    w-9 h-9 rounded-full items-center justify-center 
                    ${isSelected ? 'bg-zinc-100' : ''} 
                    ${isTodayInMonth && !isSelected ? 'border border-zinc-400' : ''}
                  `}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected
                        ? 'text-zinc-900'
                          : isCurrentMonth
                            ? 'text-zinc-200'
                            : 'text-zinc-600'
                    }`}
                  >
                    {date.getDate()}
                  </Text>
                </View>
                {hasActivities ? (
                  <View className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1" />
                ) : (
                  <View className="w-1.5 h-1.5 rounded-full mt-1" />
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}