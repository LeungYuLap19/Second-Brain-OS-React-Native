import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import type { ThemedDateTimePickerProps } from '@/types';


export default function ThemedDateTimePicker({
  isVisible,
  value,
  mode,
  onChange,
  onClose,
  title,
}: ThemedDateTimePickerProps) {
  if (Platform.OS === 'ios') {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View className="flex-1 justify-end">
          <View className="bg-zinc-900 pb-10 pt-4 px-4 rounded-t-3xl border-t border-zinc-800 justify-center items-center">
            <View className="w-full flex-row justify-between items-center mb-4 px-2">
              <Pressable onPress={onClose}>
                <Text className="text-zinc-400 font-medium text-base">Cancel</Text>
              </Pressable>
              <Text className="text-zinc-200 font-semibold text-base">
                {title ?? (mode === 'date' ? 'Select Date' : 'Select Time')}
              </Text>
              <Pressable onPress={onClose}>
                <Text className="text-emerald-400 font-bold text-base">Done</Text>
              </Pressable>
            </View>
            {isVisible && (
              <DateTimePicker
                value={value}
                mode={mode}
                display="spinner"
                themeVariant="dark"
                onChange={(_, selected) => {
                  onChange(selected);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }

  // Android
  if (!isVisible) return null;
  
  return (
    <DateTimePicker
      value={value}
      mode={mode}
      display="default"
      onChange={(_, selected) => {
        onClose();
        onChange(selected);
      }}
    />
  );
}
