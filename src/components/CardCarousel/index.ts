import { withInstall } from '/@/utils';
import cardCarousel from './src/CardCarousel.vue';
// import type { ExtractPropTypes } from 'vue';
// import { cardCarouselProps } from './src/props';

export const CardCarousel = withInstall(cardCarousel);
// export declare type CardCarouselProps = Partial<ExtractPropTypes<typeof cardCarouselProps>>;