declare module '@splidejs/react-splide' {
  import { ComponentType, RefObject } from 'react';

  interface SplideInstance {
    go: (index: number) => void;
    destroy: () => void;
    refresh: () => void;
    // Add other Splide instance methods as needed
  }

  interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    autoplay?: boolean;
    interval?: number;
    speed?: number;
    arrows?: boolean;
    pagination?: boolean;
    // Add other Splide options as needed
    [key: string]: unknown;
  }

  export interface SplideProps {
    ref?: RefObject<{ splide: SplideInstance }>;
    options?: SplideOptions;
    onMounted?: (splide: SplideInstance) => void;
    onMove?: (splide: SplideInstance) => void;
    onMoved?: (splide: SplideInstance) => void;
    onUpdated?: (splide: SplideInstance) => void;
    onResize?: (splide: SplideInstance) => void;
    onResized?: (splide: SplideInstance) => void;
    onVisible?: (splide: SplideInstance) => void;
    onHidden?: (splide: SplideInstance) => void;
    onRefresh?: (splide: SplideInstance) => void;
    onDestroy?: (splide: SplideInstance) => void;
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export interface SplideSlideProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
