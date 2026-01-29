import React from 'react'
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="chatroom/index">
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