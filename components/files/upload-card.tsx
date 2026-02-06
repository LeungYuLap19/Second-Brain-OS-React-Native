import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface UploadCardProps {
  onUpload?: () => void;
}

const fileTypes = ['PDF', 'DOCX', 'TXT', 'IMAGE'];

export default function UploadCard({ onUpload }: UploadCardProps) {
  return (
    <View className="p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800 mb-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-2xl bg-zinc-800 items-center justify-center">
            <Feather name="upload-cloud" size={18} color="#e4e4e7" />
          </View>
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
          <View
            key={type}
            className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700"
          >
            <Text className="text-xs text-zinc-300">{type}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
