<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 折线图
 * @Date: 2022-04-10 00:53:49
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-10 12:23:12
 * @FilePath: /nuclear-power/src/components/AnnualCompletion/src/lineChart.vue
-->
<template>
    <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
    import { computed, onMounted, ref, Ref, unref } from 'vue';
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
            default: [
                ['rgb(55, 162, 255)', 'rgb(116, 21, 219)'],
                ['rgb(128, 255, 165)', 'rgb(1, 191, 236)'],
                ['rgb(255, 191, 0)', 'rgb(224, 62, 76)'],
                ['rgb(0, 221, 255)', 'rgb(77, 119, 255)'],
                ['rgb(255, 0, 135)', 'rgb(135, 0, 157)'],
            ],
        },
    });

    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

    function getChartData() {
        const data = props.data.data;
        let maxArr = [];
        let seriesArr = [];
        let legendArr = [];
        data.forEach((item, key) => {
            seriesArr.push({
                name: item.title,
                smooth: true,
                data: [...item.data],
                type: 'line',
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: props.colors[key][0],
                        },
                        {
                            offset: 1,
                            color: props.colors[key][1],
                        },
                    ]),
                },
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
            });
            maxArr.push(Math.max(...item.data));
            legendArr.push(item.title);
        });
        let result = ref({
            title: props.data.title,
            max: Math.max(...maxArr) + 200,
            series: seriesArr,
            legend: legendArr,
        });
        return result;
    }

    // const data = props.data;
    onMounted(() => {
        const data = unref(getChartData());
        setOptions({
            title: {
                text: data.title,
                left: 'center',
            },
            legend: {
                data: [...data.legend],
                bottom: '0',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        width: 1,
                        color: '#019680',
                    },
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    '1月',
                    '2月',
                    '3月',
                    '4月',
                    '5月',
                    '6月',
                    '7月',
                    '8月',
                    '9月',
                    '10月',
                    '11月',
                    '12月',
                ],
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        type: 'solid',
                        color: 'rgba(226,226,226,0.5)',
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: [
                {
                    type: 'value',
                    max: data.max,
                    splitNumber: 4,
                    axisTick: {
                        show: false,
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                        },
                    },
                },
            ],
            grid: { left: '5%', right: '5%', top: '20%', bottom: '10%', containLabel: true },
            series: data.series,
        });
    });
</script>
