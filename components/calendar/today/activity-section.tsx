import HiddenDelete from '@/components/ui/elements/hidden-delete';
import SectionLabel from '@/components/ui/elements/section-label';
import { useActivities } from '@/context/activity-context';
import type { ActivitySectionProps } from '@/types';
import React from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActivityItem from './activity-item';

export default function ActivitySection({
  label,
  data,
  selectedActivityIds,
  onToggle,
  onContentSizeChange,
}: ActivitySectionProps) {
  const { deleteActivity } = useActivities();

  if (data.length === 0) return null;

  return (
    <View>
      <View className="px-5 pt-2 pb-1">
        <SectionLabel label={label} />
      </View>
      <SwipeListView
        data={data}
        keyExtractor={(item) => item.id}
        rightOpenValue={-76}
        disableRightSwipe
        closeOnRowPress
        closeOnRowOpen
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListFooterComponent={() => <View className="h-2" />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        extraData={selectedActivityIds}
        onContentSizeChange={onContentSizeChange}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          <ActivityItem
            activity={item}
            isSelected={selectedActivityIds.has(item.id)}
            onToggle={onToggle}
          />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <HiddenDelete
            rowMap={rowMap}
            item={item}
            containerClassName="flex-1 h-full flex-row justify-end items-center pr-4"
            buttonClassName="bg-red-500/10 active:bg-red-500/20 w-16 h-full rounded-2xl items-center justify-center border border-red-500/20"
            onDelete={() => deleteActivity(item.id)}
          />
        )}
      />
    </View>
  );
}
