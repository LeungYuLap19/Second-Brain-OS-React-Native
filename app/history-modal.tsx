import HiddenDelete from '@/components/chat-history/hidden-delete';
import HistoryHeader from '@/components/chat-history/history-header';
import HistoryItem from '@/components/chat-history/history-item';
import { useChatHistory } from '@/hooks/use-chat-history';
import React from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function HistoryModal() {
  const { histories, currentId, handleNewChatroom, clearAll, handleDeleteChatroom } = useChatHistory();

  return (
    <View className='flex-1 pt-12 px-6 gap-8 bg-zinc-950'>
      <HistoryHeader clearAll={clearAll} handleNewChatroom={handleNewChatroom} />
      
      <SwipeListView
        data={histories}
        keyExtractor={(item) => item.id}
        rightOpenValue={-88}
        disableRightSwipe
        closeOnRowPress
        closeOnRowOpen
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HistoryItem currentId={currentId} item={item} />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <HiddenDelete rowMap={rowMap} item={item} handleDeleteChatroom={handleDeleteChatroom} />
        )}
      />
    </View>
  )
}