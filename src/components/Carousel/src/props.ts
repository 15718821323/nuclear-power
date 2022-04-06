/*
 * @Author: hebing
 * @Interface:
 * @Description:轮播属性
 * @Date: 2022-04-06 11:37:37
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-06 16:44:33
 * @FilePath: /nuclear-power/src/components/Carousel/src/props.ts
 */
export const carouselProps = {
    // 自动播放
    autoplay: { type: Boolean, default: false },
    // 切换按钮
    arrows: { type: Boolean, default: true },
    // 面板指示点位置，可选 top bottom left right
    dotPosition: { type: String, default: 'bottom' },
    // 是否显示面板指示点
    dots: { type: Boolean, default: true },
    // 面板指示点类名
    dotsClass: { type: String, default: 'slick-dots' },
    // 动画效果
    easing: { type: String, default: 'linear' },
    // 动画效果函数
    effect: {
        type: String as PropType<'scrollx' | 'fade'>,
        default: 'scrollx',
    },

    // 切换面板的回调
    afterChange: { type: Function as PropType<(current: number) => {}>, default: null },
    // 切换面板的回调
    beforeChange: {
        type: Function as PropType<(current: number, next: number) => {}>,
        default: null,
    },
};
