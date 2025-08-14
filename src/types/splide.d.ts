declare module '@splidejs/react-splide' {
  import { ComponentType, RefObject } from 'react';

  export interface SplideProps {
    ref?: RefObject<any>;
    options?: any;
    onMounted?: (splide: any) => void;
    onMove?: (splide: any) => void;
    onMoved?: (splide: any) => void;
    onUpdated?: (splide: any) => void;
    onResize?: (splide: any) => void;
    onResized?: (splide: any) => void;
    onVisible?: (splide: any) => void;
    onHidden?: (splide: any) => void;
    onRefresh?: (splide: any) => void;
    onDestroy?: (splide: any) => void;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface SplideSlideProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
