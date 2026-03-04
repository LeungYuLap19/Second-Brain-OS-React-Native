import { AnimatedHeightViewProps } from '@/types';
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

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