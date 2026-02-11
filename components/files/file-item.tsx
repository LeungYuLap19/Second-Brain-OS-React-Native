import FileStatusPill from '@/components/files/file-status-pill';
import type { FileItemProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const typeIconMap: Record<string, keyof typeof Feather.glyphMap> = {
  pdf: 'file-text',
  txt: 'file-text',
  docx: 'file-text',
  doc: 'file-text',
  image: 'image',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  zip: 'archive',
};

export default function FileItem({ name, size, type, status, updatedAt }: FileItemProps) {
  const iconName = typeIconMap[type] ?? 'file';

  return (
    <Pressable className="p-4 rounded-3xl bg-zinc-900/70 border border-zinc-800 mb-4 active:bg-zinc-900">
      <View className="flex-row items-center gap-3">
        <View className="w-11 h-11 rounded-2xl bg-zinc-800 items-center justify-center">
          <Feather name={iconName} size={18} color="#e4e4e7" />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-zinc-100" numberOfLines={1}>
              {name}
            </Text>
            <FileStatusPill status={status} />
          </View>

          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-xs text-zinc-400">{type.toUpperCase()}</Text>
            <View className="w-1 h-1 rounded-full bg-zinc-600" />
            <Text className="text-xs text-zinc-400">{size}</Text>
            <View className="w-1 h-1 rounded-full bg-zinc-600" />
            <Text className="text-xs text-zinc-500">{updatedAt}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
