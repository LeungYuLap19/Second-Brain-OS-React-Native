import HistoryItem from '@/components/chat-history/history-item';
import CircleButton from '@/components/ui/elements/circle-button';
import HiddenDelete from '@/components/ui/elements/hidden-delete';
import ModalScreen from '@/components/ui/layout/modal-screen';
import { useChatHistory } from '@/hooks/use-chat-history';
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function HistoryModal() {
  const { histories, currentId, handleNewChatroom, clearAll, handleDeleteChatroom } = useChatHistory();

  return (
    <ModalScreen
      title="Chat History"
      contentClassName="px-0 pb-0"
      rightSlot={
        <View className="flex-row items-center gap-2">
          <CircleButton onPress={clearAll}>
            <AntDesign name="clear" size={18} color="#e4e4e7" />
          </CircleButton>
          <CircleButton onPress={handleNewChatroom}>
            <Feather name="plus" size={18} color="#e4e4e7" />
          </CircleButton>
        </View>
      }
    >
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
          <HiddenDelete 
            rowMap={rowMap} 
            item={item} 
            onDelete={handleDeleteChatroom} 
          />
        )}
      />
    </ModalScreen>
  )
}