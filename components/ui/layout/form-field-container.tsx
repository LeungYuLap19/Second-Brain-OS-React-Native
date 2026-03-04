import type { FormFieldContainerProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

const padMap: Record<NonNullable<FormFieldContainerProps['padding']>, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

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
