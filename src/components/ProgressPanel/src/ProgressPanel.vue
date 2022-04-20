<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 进度面板
 * @Date: 2022-04-06 14:39:47
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-19 21:46:50
 * @FilePath: /nuclear-power/src/components/ProgressPanel/src/ProgressPanel.vue
-->
<template>
    <div class="progress-panel">
        <div class="progress-panel-list">
            <template v-for="(item, key) in items" :key="key">
                <ProgressPanelItem :item="item" />
            </template>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import ProgressPanelItem from './ProgressPanelItem.vue';

    export default defineComponent({
        components: { ProgressPanelItem },
    });
</script>
<script lang="ts" setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        list: {
            type: Array,
            default: () => [],
        },
    });

    const items = props.list;
</script>
<style lang="less" scoped>
    .progress-panel {
        width: 100%;
        height: 100%;
        position: relative;

        &-list {
            max-width: 540px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            margin: 0 auto;
        }
        &-item {
            min-width: 80px;
            max-width: 113px;
            width: 24%;
            height: 170px;
            background: #2a3456;
            border-radius: 24px;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
            transition: all 0.3s;
            padding: 10px;
            overflow: hidden;
        }
    }
</style>
