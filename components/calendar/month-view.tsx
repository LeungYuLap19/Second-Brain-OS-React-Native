import { Activity, formatDateKey, getMonthMatrix, isSameDay } from '@/lib/utils/date-utils';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface MonthViewProps {
  monthDate: Date;
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export default function MonthView({ monthDate, selectedDate, activities, onSelectDate }: MonthViewProps) {
  const weeks = getMonthMatrix(monthDate);
  const title = `${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`;

  return (
    <View className="p-4 rounded-3xl bg-zinc-900/70 border border-zinc-800">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-zinc-100">{title}</Text>
        <Text className="text-xs text-zinc-400">Tap a day to open week view</Text>
      </View>

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

            return (
              <Pressable
                key={date.toISOString()}
                onPress={() => onSelectDate(date)}
                className="items-center justify-center py-3"
                style={{ width: `${100 / 7}%` }}
              >
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center ${isSelected ? 'bg-zinc-100' : ''}`}
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
                {hasActivities && <View className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1" />}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
