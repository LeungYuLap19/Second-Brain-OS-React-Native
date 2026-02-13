import { CardContainerProps, CardPressableProps } from '@/types';
import React from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';

export default function CardContainer({ 
  children, 
  className, 
  asChild,
  ...props 
}: CardContainerProps | CardPressableProps) {
  const baseClassName = 'rounded-3xl bg-zinc-900/70 border border-zinc-800';
  const combinedClassName = `${baseClassName} ${className || ''}`;

  if (asChild) {
    return (
      <Pressable className={combinedClassName} {...(props as PressableProps)}>
        {children}
      </Pressable>
    );
  }

  return (
    <View className={combinedClassName} {...(props as ViewProps)}>
      {children}
    </View>
  );
}
