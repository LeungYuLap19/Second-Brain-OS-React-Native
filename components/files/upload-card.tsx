import Badge from '@/components/ui/elements/badge';
import IconCircle from '@/components/ui/elements/icon-circle';
import CardContainer from '@/components/ui/layout/card-container';
import type { UploadCardProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const fileTypes = ['PDF', 'DOCX', 'TXT', 'IMAGE'];

export default function UploadCard({ onUpload }: UploadCardProps) {
  return (
    <CardContainer className="p-5 mb-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <IconCircle size="lg" shape="rounded" bgClassName="bg-zinc-800">
            <Feather name="upload-cloud" size={18} color="#e4e4e7" />
          </IconCircle>
          <View>
            <Text className="text-base font-semibold text-zinc-100">Upload files</Text>
            <Text className="text-xs text-zinc-400">Drag in or pick from device</Text>
          </View>
        </View>

        <Pressable
          onPress={onUpload}
          className="rounded-full px-4 py-2 bg-zinc-100"
        >
          <Text className="text-xs font-semibold text-zinc-900">Choose</Text>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap gap-2 mt-4">
        {fileTypes.map((type) => (
          <Badge
            key={type}
            label={type}
            variant="neutral"
            size="sm"
            borderClassName="border border-zinc-700"
            className="bg-zinc-800"
          />
        ))}
      </View>
    </CardContainer>
  );
}
