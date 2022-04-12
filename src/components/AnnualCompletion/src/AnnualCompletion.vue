<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 年度完成情况
 * @Date: 2022-04-09 23:00:46
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-13 01:14:27
 * @FilePath: /nuclear-power/src/components/AnnualCompletion/src/AnnualCompletion.vue
-->
<template>
    <div class="annual-completion">
        <div class="annual-completion-container">
            <div class="annual-completion-header">
                <div class="annual-completion-header-title"> <PieChartFilled /> 年度完成情况 </div>
                <div class="annual-completion-header-more" @click="handlerMore">
                    更多 <MoreOutlined />
                </div>
            </div>
            <div class="annual-completion-body">
                <div class="pie-chart">
                    <PieChart :width="'100%'" :height="'100%'" :data="pieData" :colors="colors" />
                </div>
                <div class="line-chart">
                    <LineChart :width="'100%'" :height="'100%'" :data="lineData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { PieChartFilled, MoreOutlined } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref, ref } from 'vue';
    import PieChart from './PieChart.vue';
    import LineChart from './LineChart.vue';

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
        border-radius: 12px;
        backdrop-filter: blur(4px);
        background: white;
        padding: 15px;
        &-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-title {
                font-size: 20px;
                font-family: PangMenZhengDao, PangMenZhengDao-Regular;
                font-weight: 400;
                color: #1a1a1a;
                line-height: 1;
                letter-spacing: 0.1px;
            }
            &-more {
                font-size: 14px;
                color: #999;
                line-height: 1;
                transition: all 0.2s;
                cursor: pointer;
                &:hover,
                &:focus {
                    color: @primary-color;
                }
            }
        }
        &-body {
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
    [data-theme='dark'] {
        .annual-completion {
            background: #0d0d0d;
        }
        .annual-completion-header-title {
            color: #e4e4e4;
        }
        .file-list-body {
            .file-item-body-header .header-title {
                color: #e4e4e4;
            }
            .file-item-icon {
                background: #333;
            }
        }
    }
</style>
