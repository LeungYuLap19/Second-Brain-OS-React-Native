import { headerVariantClassMap } from '@/constants/ui'
import { HeaderViewProps } from '@/types'
import React from 'react'
import { Text, View } from 'react-native'

export default function Header({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  variant = 'page',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  children,
}: HeaderViewProps) {
  const hasStructuredContent = title || subtitle || leftSlot || rightSlot

  return (
    <View className={`flex-row items-center justify-between px-6 ${headerVariantClassMap[variant]} ${className}`}>
      {children ? (
        children
      ) : (
        <>
          {leftSlot ? (
            leftSlot
          ) : (
            <View>
              {title ? (
                <Text className={`text-2xl font-bold text-zinc-100 ${titleClassName}`}>{title}</Text>
              ) : null}
              {subtitle ? (
                <Text className={`text-xs text-zinc-400 ${subtitleClassName}`}>{subtitle}</Text>
              ) : null}
            </View>
          )}

          {rightSlot || (!hasStructuredContent ? null : <View />)}
        </>
      )}
    </View>
  )
}