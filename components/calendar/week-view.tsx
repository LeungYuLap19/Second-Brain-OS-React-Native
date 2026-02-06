import { Activity, formatDateKey, getWeekDays, isSameDay } from '@/lib/utils/date-utils';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface WeekViewProps {
  selectedDate: Date;
  activities: Record<string, Activity[]>;
  onSelectDate: (date: Date) => void;
}

export default function WeekView({ selectedDate, activities, onSelectDate }: WeekViewProps) {
  const days = getWeekDays(selectedDate);
  const rangeLabel = `${monthNames[days[0].getMonth()]} ${days[0].getDate()} - ${monthNames[days[6].getMonth()]} ${days[6].getDate()}`;
  const selectedKey = formatDateKey(selectedDate);
  const dayActivities = activities[selectedKey] ?? [];

  return (
    <View className="gap-4">
      <View className="p-4 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-semibold text-zinc-100">Week view</Text>
            <Text className="text-xs text-zinc-400">{rangeLabel}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="calendar" size={16} color="#a1a1aa" />
            <Text className="text-xs text-zinc-400">{monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}</Text>
          </View>
        </View>

        <View className="flex-row">
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
                {hasActivities && <View className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-zinc-900' : 'bg-red-400'} mt-1`} />}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="p-4 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-zinc-100">Today's activities</Text>
          <Text className="text-xs text-zinc-400">{dayActivities.length} items</Text>
        </View>

        {dayActivities.length === 0 ? (
          <View className="items-center py-10">
            <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center mb-3">
              <Feather name="check" size={20} color="#a1a1aa" />
            </View>
            <Text className="text-sm text-zinc-400">No activities scheduled</Text>
          </View>
        ) : (
          <View className="gap-3">
            {dayActivities.map((activity) => (
              <View
                key={activity.id}
                className="flex-row items-center gap-3 p-3 rounded-2xl bg-zinc-950"
              >
                <View className="w-8 h-8 rounded-full border border-zinc-700 items-center justify-center">
                  <Feather name="circle" size={14} color="#a1a1aa" />
                </View>
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
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
