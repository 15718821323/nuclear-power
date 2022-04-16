<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 年度完成情况
 * @Date: 2022-04-09 23:00:46
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-16 21:17:09
 * @FilePath: /nuclear-power/src/components/AnnualCompletion/src/AnnualCompletion.vue
-->
<template>
    <div class="annual-completion">
        <SimpleCard :onMore="handlerMore" title="年度完成情况" icon="ant-design:pie-chart-filled">
            <div class="annual-completion-body">
                <div class="pie-chart">
                    <PieChart :width="'100%'" :height="'100%'" :data="pieData" :colors="colors" />
                </div>
                <div class="line-chart">
                    <LineChart :width="'100%'" :height="'100%'" :data="lineData" />
                </div>
            </div>
        </SimpleCard>
    </div>
</template>

<script lang="ts" setup>
    import { PieChartFilled, MoreOutlined } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref, ref } from 'vue';
    import PieChart from './PieChart.vue';
    import LineChart from './LineChart.vue';
    import { SimpleCard } from '/@/components/SimpleCard';

    const props = defineProps({
        loading: Boolean,
        pieData: {
            type: Object,
            required: true,
        },
        lineData: {
            type: Object,
            required: true,
        },
    });

    const pieData = props.pieData;
    const lineData = props.lineData;

    const colors = ref(['#13328C', '#3B87F7', '#F7C44E', '#64D5CD', '#69DA6E', '#E67FC7']);

    const emit = defineEmits(['onMore']);
    function handlerMore() {
        emit('onMore');
    }
</script>

<style lang="less" scoped>
    .annual-completion {
        height: 100%;
        &-body {
            width: 100%;
            height: 100%;
            min-height: 300px;
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            @pie-width: 300px;
            .pie-chart {
                width: @pie-width;
                height: 100%;
            }
            .line-chart {
                width: calc(~'100% - @{pie-width}');
                height: 100%;
            }
        }
    }
    // [data-theme='dark'] {
    //     .file-list-body {
    //         :deep(.file-item-body-header .header-title) {
    //             color: #e4e4e4;
    //         }
    //     }
    // }
</style>
