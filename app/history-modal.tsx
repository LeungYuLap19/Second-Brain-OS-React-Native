import HistoryHeader from '@/components/chat-history/history-header';
import HistoryItem from '@/components/chat-history/history-item';
import HiddenDelete from '@/components/ui/hidden-delete';
import ThemedView from '@/components/ui/themed-view';
import { useChatHistory } from '@/hooks/use-chat-history';
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function HistoryModal() {
  const { histories, currentId, handleNewChatroom, clearAll, handleDeleteChatroom } = useChatHistory();

  return (
    <ThemedView>
      <HistoryHeader clearAll={clearAll} handleNewChatroom={handleNewChatroom} />
      
      <SwipeListView
        data={histories}
        keyExtractor={(item) => item.id}
        rightOpenValue={-88}
        disableRightSwipe
        closeOnRowPress
        closeOnRowOpen
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HistoryItem currentId={currentId} item={item} />
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <HiddenDelete 
            rowMap={rowMap} 
            item={item} 
            onDelete={handleDeleteChatroom} 
          />
        )}
      />
    </ThemedView>
  )
}