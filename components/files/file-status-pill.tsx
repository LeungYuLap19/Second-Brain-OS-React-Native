import React from 'react';
import { Text, View } from 'react-native';

export type FileStatus = 'uploading' | 'processing' | 'ready';

interface FileStatusPillProps {
  status: FileStatus;
}

const statusStyles: Record<FileStatus, { label: string; container: string; text: string }> = {
  uploading: {
    label: 'Uploading',
    container: 'bg-sky-500/15 border border-sky-500/30',
    text: 'text-sky-200',
  },
  processing: {
    label: 'Processing',
    container: 'bg-amber-500/15 border border-amber-500/30',
    text: 'text-amber-200',
  },
  ready: {
    label: 'Ready',
    container: 'bg-emerald-500/15 border border-emerald-500/30',
    text: 'text-emerald-200',
  },
};

export default function FileStatusPill({ status }: FileStatusPillProps) {
  const styles = statusStyles[status];

  return (
    <View className={`px-2.5 py-1 rounded-full ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{styles.label}</Text>
    </View>
  );
}
