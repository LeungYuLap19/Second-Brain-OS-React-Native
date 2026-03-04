import FileStatusPill from '@/components/files/file-status-pill';
import DotSeparator from '@/components/ui/elements/dot-separator';
import IconCircle from '@/components/ui/elements/icon-circle';
import CardContainer from '@/components/ui/layout/card-container';
import type { FileItemProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View } from 'react-native';

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

function FileItem({ name, size, type, status, updatedAt }: FileItemProps) {
  const iconName = typeIconMap[type] ?? 'file';

  return (
    <CardContainer asChild className="p-4 mb-4 active:bg-zinc-900">
      <View className="flex-row items-center gap-3">
        <IconCircle size="lg" shape="rounded" bgClassName="bg-zinc-800">
          <Feather name={iconName} size={18} color="#e4e4e7" />
        </IconCircle>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-zinc-100" numberOfLines={1}>
              {name}
            </Text>
            <FileStatusPill status={status} />
          </View>

          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-xs text-zinc-400">{type.toUpperCase()}</Text>
            <DotSeparator />
            <Text className="text-xs text-zinc-400">{size}</Text>
            <DotSeparator />
            <Text className="text-xs text-zinc-500">{updatedAt}</Text>
          </View>
        </View>
      </View>
    </CardContainer>
  );
}

export default React.memo(FileItem);
