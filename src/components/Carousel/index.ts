/*
 * @Author: hebing
 * @Interface:
 * @Description:banner轮播图组件
 * @Date: 2022-04-06 11:26:26
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-06 12:00:28
 * @FilePath: /nuclear-power/src/components/Carousel/index.ts
 */
import { withInstall } from '/@/utils';
import carousel from './src/Carousel.vue';
import type { ExtractPropTypes } from 'vue';
import { carouselProps } from './src/props';

export const Carousel = withInstall(carousel);
export declare type CarouselProps = Partial<ExtractPropTypes<typeof carouselProps>>;
