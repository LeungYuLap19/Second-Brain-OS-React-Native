import FileItem from '@/components/files/file-item';
import UploadCard from '@/components/files/upload-card';
import Header from '@/components/ui/header';
import ThemedSafeAreaView from '@/components/ui/themed-safe-area-view';
import { files } from '@/constants/files';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function FilesPage() {
  return (
    <ThemedSafeAreaView>
      <Header
        title="Files"
        subtitle="Upload and index your knowledge"
      />

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }}>
        <UploadCard />

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-zinc-100">Recent uploads</Text>
          <Text className="text-xs text-zinc-400">5 items</Text>
        </View>

        {files.map((file) => (
          <FileItem
            key={file.id}
            name={file.name}
            size={file.size}
            type={file.type}
            status={file.status as 'uploading' | 'processing' | 'ready'}
            updatedAt={file.updatedAt}
          />
        ))}
      </ScrollView>
    </ThemedSafeAreaView>
  );
}