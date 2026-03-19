import AnimatedHeightView from '@/components/ui/animation/animated-height-view';
import { monthNames, weekdayNames } from '@/constants/calendar';
import useAnimatedHeight from '@/hooks/use-animated-height';
import { categorizeActivities } from '@/lib/utils/activity-utils';
import { isSameDay } from '@/lib/utils/date-utils';
import type { TodaysActivitiesProps } from '@/types';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import EmptyState from '@/components/ui/elements/empty-state';
import IconCircle from '@/components/ui/elements/icon-circle';
import CardContainer from '@/components/ui/layout/card-container';
import ActivitySection from './activity-section';

export default function TodaysActivities({ selectedDate, dayActivities }: TodaysActivitiesProps) {
  const title = `${weekdayNames[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
  const isToday = isSameDay(selectedDate, new Date());
  
  const [selectedActivityIds, setSelectedActivityIds] = useState<Set<string>>(new Set());
  const { onLayout, animatedViewProps } = useAnimatedHeight({
    overflowHidden: true,
    springConfig: { duration: 200 },
  });

  const sections = useMemo(() => categorizeActivities(dayActivities), [dayActivities]);

  const handleToggle = (id: string) => setSelectedActivityIds((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
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
          <View onLayout={onLayout}>
            <ActivitySection label="Urgent" data={sections.urgent} selectedActivityIds={selectedActivityIds} onToggle={handleToggle} />
            <ActivitySection label="Priority" data={sections.priority} selectedActivityIds={selectedActivityIds} onToggle={handleToggle} />
            <ActivitySection label="All Day" data={sections.allDay} selectedActivityIds={selectedActivityIds} onToggle={handleToggle} />
            <ActivitySection label="Scheduled" data={sections.scheduled} selectedActivityIds={selectedActivityIds} onToggle={handleToggle} />
            <View className="h-4" />
          </View>
        )}
      </AnimatedHeightView>
    </CardContainer>
  );
}