import { CircleButtonProps } from '@/types';
import React from 'react';
import { Pressable } from 'react-native';

export default function CircleButton({ children, className, ...props }: CircleButtonProps) {
  return (
    <Pressable
      className={`rounded-full p-3 bg-zinc-900 border border-zinc-800 active:bg-zinc-800 ${className || ''}`}
      {...props}
    >
      {children}
    </Pressable>
  );
}
