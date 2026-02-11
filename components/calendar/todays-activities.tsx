import { isSameDay } from '@/lib/utils/date-utils'
import type { TodaysActivitiesProps } from '@/types'
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TodaysActivities({ selectedDate, dayActivities }: TodaysActivitiesProps) {
  const title = `${weekdayNames[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
  const isToday = isSameDay(selectedDate, new Date());
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  useEffect(() => {
    animatedHeight.value = withSpring(contentHeight, { duration: 200 });
  }, [contentHeight, animatedHeight]);

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <View className="rounded-3xl bg-zinc-900/70 border border-zinc-800 overflow-hidden">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-lg font-semibold text-zinc-100">
          {`${dayActivities.length > 1 ? 'Activities' : 'Activity'} for ${isToday ? 'Today' : title}`}
        </Text>
        <Text className="text-xs text-zinc-400">{dayActivities.length} items</Text>
      </View>
      <Animated.View style={animatedStyle}>
        <View onLayout={onContentLayout} className="px-4 pb-4">
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
      </Animated.View>
    </View>
  )
}