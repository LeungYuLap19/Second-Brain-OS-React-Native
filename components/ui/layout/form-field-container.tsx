import { padMap } from '@/constants/ui';
import type { FormFieldContainerProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

export default function FormFieldContainer({
  children,
  padding = 'md',
  className,
  ...viewProps
}: FormFieldContainerProps) {
  return (
    <View
      className={`bg-zinc-900/50 ${padMap[padding]} rounded-2xl border border-zinc-800 ${className ?? ''}`}
      {...viewProps}
    >
      {children}
    </View>
  );
}
