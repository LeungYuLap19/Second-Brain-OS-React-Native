import type { UseAnimatedHeightOptions } from '@/types';
import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

/**
 * Hook that manages height measurement for {@link AnimatedHeightView}.
 *
 * Returns layout callbacks and a pre-built `animatedViewProps` object that
 * spreads directly onto `<AnimatedHeightView>`.
 *
 * **Always-visible content** — spread `animatedViewProps` as-is:
 * ```tsx
 * const { onLayout, onContentSizeChange, animatedViewProps } = useAnimatedHeight({ overflowHidden: true });
 *
 * <AnimatedHeightView {...animatedViewProps}>
 *   <View onLayout={onLayout}>…</View>
 * </AnimatedHeightView>
 * ```
 *
 * **Collapsible content** — override `height` with a toggle:
 * ```tsx
 * const { contentHeight, onLayout, animatedViewProps } = useAnimatedHeight();
 *
 * <AnimatedHeightView {...animatedViewProps} height={expand ? contentHeight : 0}>
 *   <View onLayout={onLayout} collapsable={false}
 *         style={{ position: 'absolute', width: '100%' }}>
 *     …
 *   </View>
 * </AnimatedHeightView>
 * ```
 * Use `position: 'absolute'` + `collapsable={false}` so the inner view is
 * measured even when the animated container is collapsed to height 0.
 *
 * @param options - Optional {@link UseAnimatedHeightOptions} forwarded to `animatedViewProps`.
 * @returns `contentHeight`, `setContentHeight`, `onLayout`, `onContentSizeChange`, and `animatedViewProps`.
 */
export default function useAnimatedHeight(options?: UseAnimatedHeightOptions) {
  const [contentHeight, setContentHeight] = useState(0);

  const updateHeight = (h: number) => {
    if (h <= 0) return;
    setContentHeight((prev) => (prev === h ? prev : h));
  };

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    updateHeight(event.nativeEvent.layout.height);
  }, []);

  const onContentSizeChange = useCallback((_: number, h: number) => {
    updateHeight(h);
  }, []);

  const animatedViewProps = {
    height: contentHeight,
    overflowHidden: options?.overflowHidden,
    springConfig: options?.springConfig,
  };

  return { contentHeight, setContentHeight, onLayout, onContentSizeChange, animatedViewProps };
}
