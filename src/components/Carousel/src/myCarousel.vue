<template>
    <Carousel v-bind="getBindValue">
        <template #prevArrow>
            <div class="carousel-slick-arrow" style="left: 10px; z-index: 1">
                <LeftCircleFilled />
            </div>
        </template>
        <template #default="data">
            <slot v-bind="data || {}"></slot>
        </template>
        <template #nextArrow>
            <div class="carousel-slick-arrow" style="right: 10px">
                <RightCircleFilled />
            </div>
        </template>
    </Carousel>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Carousel',
        inheritAttrs: false,
    });
</script>
<script lang="ts" setup>
    import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref } from 'vue';
    import { Carousel } from 'ant-design-vue';
    import { useAttrs } from '/@/hooks/core/useAttrs';
    import { carouselProps } from './props';

    const props = defineProps({ ...carouselProps });
    const getBindValue = computed(() => ({ ...props }));
</script>
<style lang="less" scoped>
    :deep(.carousel-slick-arrow) {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.8);
        &::after,
        &::before {
            content: '';
        }
        &:hover {
            color: rgba(255, 255, 255, 1);
        }
    }
</style>
