import FileItem from '@/components/files/file-item';
import UploadCard from '@/components/files/upload-card';
import HeaderView from '@/components/ui/header-view';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const files = [
  {
    id: '1',
    name: 'Project-Brief.pdf',
    type: 'pdf',
    size: '2.4 MB',
    status: 'ready',
    updatedAt: '2m ago',
  },
  {
    id: '2',
    name: 'Meeting Notes.txt',
    type: 'txt',
    size: '12 KB',
    status: 'processing',
    updatedAt: 'just now',
  },
  {
    id: '3',
    name: 'Brand Assets.zip',
    type: 'zip',
    size: '18.2 MB',
    status: 'uploading',
    updatedAt: '5s ago',
  },
  {
    id: '4',
    name: 'Roadmap.docx',
    type: 'docx',
    size: '1.1 MB',
    status: 'ready',
    updatedAt: '1h ago',
  },
  {
    id: '5',
    name: 'Product Shot.png',
    type: 'image',
    size: '3.9 MB',
    status: 'ready',
    updatedAt: '3h ago',
  },
];

export default function FilesPage() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <HeaderView className="justify-between">
        <View>
          <Text className="text-2xl font-bold text-zinc-100">Files</Text>
          <Text className="text-xs text-zinc-400">Upload and index your knowledge</Text>
        </View>

        {/* <Pressable className="rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800">
          <Feather name="plus" size={18} color="#e4e4e7" />
        </Pressable> */}
      </HeaderView>

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
    </SafeAreaView>
  );
}