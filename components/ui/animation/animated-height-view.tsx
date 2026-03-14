import { AnimatedHeightViewProps } from '@/types';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

/**
 * Animated container that spring-animates to a target `height`.
 *
 * Pair with {@link useAnimatedHeight} to avoid manual height state management.
 *
 * @param height - Target height in pixels. Animates to this value on change.
 * @param overflowHidden - Clip children outside the animated bounds. Defaults to `false`.
 * @param springConfig - Reanimated `withSpring` config. Defaults to `{ duration: 200 }`.
 * @param style - Additional styles merged onto the animated view.
 * @param children - Content to render inside the animated container.
 *
 * @example
 * ```tsx
 * // With the hook (recommended)
 * const { onLayout, animatedViewProps } = useAnimatedHeight({ overflowHidden: true });
 *
 * <AnimatedHeightView {...animatedViewProps}>
 *   <View onLayout={onLayout}>…</View>
 * </AnimatedHeightView>
 *
 * // Standalone with a known height
 * <AnimatedHeightView height={isOpen ? 120 : 0} overflowHidden>
 *   …
 * </AnimatedHeightView>
 * ```
 */
export default function AnimatedHeightView({
  height,
  children,
  style,
  overflowHidden = false,
  springConfig = { duration: 200 },
}: AnimatedHeightViewProps) {
  const animatedHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: overflowHidden ? 'hidden' : 'visible',
  }));

  useEffect(() => {
    animatedHeight.value = withSpring(height, springConfig);
  }, [height, animatedHeight, springConfig]);

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}