import AnimatedHeightView from '@/components/ui/animated-height-view';
import { monthNames, weekdayNames } from '@/constants/calendar';
import { isSameDay } from '@/lib/utils/date-utils';
import type { TodaysActivitiesProps } from '@/types';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';

import CardContainer from '@/components/ui/card-container';
import HiddenDelete from '@/components/ui/hidden-delete';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActivityItem from './activity-item';
import Placeholder from './placeholder';

export default function TodaysActivities({ selectedDate, dayActivities }: TodaysActivitiesProps) {
  const SPRING_CONFIG = { duration: 200 } as const;
  const title = `${weekdayNames[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
  const isToday = isSameDay(selectedDate, new Date());
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    setListHeight(0);
  }, [selectedDate, dayActivities.length]);

  const updateListHeight = (height: number) => {
    if (height <= 0) return;
    setListHeight((prev) => (prev === height ? prev : height));
  };

  const onPlaceholderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    updateListHeight(height);
  };

  const onContentSizeChange = (_: number, height: number) => {
    updateListHeight(height);
  };

  return (
    <CardContainer className="overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-3xl">
      <View className="flex-row items-center justify-between p-5 border-b border-zinc-800/50">
        <View>
          <Text className="text-lg font-semibold text-zinc-100 mb-0.5">
            {isToday ? 'Today' : title}
          </Text>
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {dayActivities.length} {dayActivities.length === 1 ? 'Task' : 'Tasks'} Scheduled
          </Text>
        </View>
        <View className="bg-zinc-800 w-8 h-8 rounded-full items-center justify-center border border-zinc-700">
          <Text className="text-xs font-bold text-zinc-400">{dayActivities.length}</Text>
        </View>
      </View>

      <AnimatedHeightView height={listHeight} overflowHidden springConfig={SPRING_CONFIG}>
        {dayActivities.length === 0 ? (
          <View onLayout={onPlaceholderLayout} className="px-4 pb-4">
            <Placeholder />
          </View>
        ) : (
            <SwipeListView
              data={dayActivities}
              keyExtractor={(item) => item.id}
              rightOpenValue={-76}
              disableRightSwipe
              closeOnRowPress
              closeOnRowOpen
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-3" />}
              ListFooterComponent={() => <View className="h-4" />}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              extraData={selectedActivityId}
              onContentSizeChange={onContentSizeChange}
              removeClippedSubviews={false}
              renderItem={({ item }) => (
                <ActivityItem
                  activity={item}
                  isSelected={selectedActivityId === item.id}
                  onToggle={(id) => setSelectedActivityId((prev) => (prev === id ? null : id))}
                />
              )}
              
              renderHiddenItem={({ item }, rowMap) => (
                <HiddenDelete
                  rowMap={rowMap}
                  item={item}
                  containerClassName='flex-1 h-full flex-row justify-end items-center pr-4'
                  buttonClassName="bg-red-500/10 active:bg-red-500/20 w-16 h-full rounded-2xl items-center justify-center border border-red-500/20"
                  onDelete={() => { }}
                />
              )}
            />
        )}
      </AnimatedHeightView>
    </CardContainer>
  );
}