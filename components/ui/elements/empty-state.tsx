import type { EmptyStateProps } from '@/types';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import IconCircle from './icon-circle';

export default function EmptyState({ icon, message, iconColor = '#a1a1aa', className }: EmptyStateProps) {
  return (
    <View className={`items-center py-10 ${className ?? ''}`}>
      <IconCircle size="xl" bgClassName="bg-zinc-800" className="mb-3">
        <Feather name={icon} size={20} color={iconColor} />
      </IconCircle>
      <Text className="text-sm text-zinc-400">{message}</Text>
    </View>
  );
}
