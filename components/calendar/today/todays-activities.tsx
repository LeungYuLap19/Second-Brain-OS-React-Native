import AnimatedHeightView from '@/components/ui/animation/animated-height-view';
import { monthNames, weekdayNames } from '@/constants/calendar';
import useAnimatedHeight from '@/hooks/use-animated-height';
import { isSameDay } from '@/lib/utils/date-utils';
import type { TodaysActivitiesProps } from '@/types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import EmptyState from '@/components/ui/elements/empty-state';
import HiddenDelete from '@/components/ui/elements/hidden-delete';
import IconCircle from '@/components/ui/elements/icon-circle';
import CardContainer from '@/components/ui/layout/card-container';
import { useActivities } from '@/context/activity-context';
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActivityItem from './activity-item';

export default function TodaysActivities({ selectedDate, dayActivities }: TodaysActivitiesProps) {
  const title = `${weekdayNames[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
  const isToday = isSameDay(selectedDate, new Date());
  
  const [selectedActivityIds, setSelectedActivityIds] = useState<Set<string>>(new Set());
  const { deleteActivity } = useActivities();
  const { onLayout, onContentSizeChange, animatedViewProps } = useAnimatedHeight({
    overflowHidden: true,
    springConfig: { duration: 200 },
  });

  return (
    <CardContainer className="overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-3xl">
      <View className="flex-row items-center justify-between p-5 border-b border-zinc-800/50 mb-4">
        <View>
          <Text className="text-lg font-semibold text-zinc-100 mb-0.5">
            {isToday ? 'Today' : title}
          </Text>
          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {dayActivities.length} {dayActivities.length === 1 ? 'Task' : 'Tasks'} Scheduled
          </Text>
        </View>
        <IconCircle size="sm" bgClassName="bg-zinc-800" borderClassName="border border-zinc-700">
          <Text className='text-xs font-bold text-zinc-400'>{dayActivities.length}</Text>
        </IconCircle>
      </View>

      <AnimatedHeightView {...animatedViewProps}>
        {dayActivities.length === 0 ? (
          <View onLayout={onLayout} className="px-4 pb-4">
            <EmptyState icon="check" message="No activities scheduled" />
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
              extraData={selectedActivityIds}
              onContentSizeChange={onContentSizeChange}
              removeClippedSubviews={false}
              renderItem={({ item }) => (
                <ActivityItem
                  activity={item}
                  isSelected={selectedActivityIds.has(item.id)}
                  onToggle={(id) => setSelectedActivityIds((prev) => {
                    const next = new Set(prev);
                    next.has(id) ? next.delete(id) : next.add(id);
                    return next;
                  })}
                />
              )}
              
              renderHiddenItem={({ item }, rowMap) => (
                <HiddenDelete
                  rowMap={rowMap}
                  item={item}
                  containerClassName='flex-1 h-full flex-row justify-end items-center pr-4'
                  buttonClassName="bg-red-500/10 active:bg-red-500/20 w-16 h-full rounded-2xl items-center justify-center border border-red-500/20"
                  onDelete={() => deleteActivity(item.id)}
                />
              )}
            />
        )}
      </AnimatedHeightView>
    </CardContainer>
  );
}