<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 饼状图
 * @Date: 2022-04-10 00:21:45
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-17 00:05:54
 * @FilePath: /nuclear-power/src/components/AnnualCompletion/src/PieChart.vue
-->
<template>
    <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts" setup>
    import { Ref, ref, watch } from 'vue';
    import { useECharts } from '/@/hooks/web/useECharts';
    const props = defineProps({
        loading: Boolean,
        width: {
            type: String as PropType<string>,
            default: '100%',
        },
        height: {
            type: String as PropType<string>,
            default: '300px',
        },
        data: {
            type: Object,
            required: true,
        },
        colors: {
            type: Array,
            default: ['#13328C', '#3B87F7', '#F7C44E', '#64D5CD', '#69DA6E', '#E67FC7'],
        },
    });
    const data = props.data;
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    watch(
        () => props.loading,
        () => {
            if (props.loading) {
                return;
            }
            setOptions({
                title: {
                    text: data.title,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    bottom: '0',
                    itemWidth: 8,
                    itemHeight: 8,
                    itemStyle: {
                        borderWidth: 0,
                        borderRadius: 5,
                        borderColor: 'rgba(255,255,255,0.5)',
                        opacity: 0.5,
                    },
                },
                series: [
                    {
                        color: props.colors,
                        name: data.title,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        // itemStyle: {
                        //     borderRadius: 3,
                        //     borderColor: 'transparent',
                        //     borderWidth: 2,
                        // },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '12',
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [...data.data],
                        animationType: 'scale',
                        animationEasing: 'exponentialInOut',
                        animationDelay: function () {
                            return Math.random() * 100;
                        },
                    },
                ],
            });
        },
        { immediate: true },
    );
</script>
