import { useActivityCrud } from '@/hooks/use-activity-crud';
import { ActivityContextValue, ActivityMap } from '@/types';
import React, { createContext, useContext, useState } from 'react';

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<ActivityMap>({});
  const crud = useActivityCrud(setActivities);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        ...crud,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}
