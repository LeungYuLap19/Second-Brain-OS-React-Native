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
    <CardContainer className="overflow-hidden">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-lg font-semibold text-zinc-100">
          {`${dayActivities.length > 1 ? 'Activities' : 'Activity'} for ${isToday ? 'Today' : title}`}
        </Text>
        <Text className="text-xs text-zinc-400">{dayActivities.length} items</Text>
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
                  containerClassName="flex-1 h-full flex-row justify-end items-center"
                  buttonClassName="bg-red-500 h-full w-20 rounded-2xl items-center justify-center"
                  onDelete={() => { }}
                />
              )}
            />
        )}
      </AnimatedHeightView>
    </CardContainer>
  );
}