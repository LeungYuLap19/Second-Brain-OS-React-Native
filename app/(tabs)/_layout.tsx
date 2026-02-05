import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor="#0a0a0a"
      iconColor={{ default: '#71717a', selected: '#f4f4f5' }}
      labelStyle={{
        default: { color: '#71717a' },
        selected: { color: '#f4f4f5' },
      }}
    >
      <NativeTabs.Trigger name="chatroom">
        <Label>Chatroom</Label>
        <Icon sf={{ default: 'bubble.left', selected: 'bubble.left.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="files">
        <Label>Files</Label>
        <Icon sf={{ default: 'folder', selected: 'folder.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar">
        <Label>Calendar</Label>
        <Icon sf={{ default: 'calendar', selected: 'calendar' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inbox">
        <Label>Inbox</Label>
        <Icon sf={{ default: 'mail.stack', selected: 'mail.stack.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}