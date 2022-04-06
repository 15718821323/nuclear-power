<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 新闻列表
 * @Date: 2022-04-06 17:37:01
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-06 17:56:24
 * @FilePath: /nuclear-power/src/views/personalPortal/personalPortal/myPortal/components/newsList.vue
-->
<template>
    <div class="news-list">
        <div class="news-list-header">
            <div class="news-list-title">
                <span>新闻</span>
                <span>公告</span>
            </div>
        </div>
        <div class="news-list-body">
            <div class="news-list-item" v-for="(item, key) in list" :key="key">
                <div class="news-list-item-title">{{ item.type }}</div>
                <div class="news-list-item-content">{{ item.title }}</div>
                <div class="news-list-item-time">{{ item.time }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'NewsList',
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
    .news-list {
        &-header {
        }
        &-title {
            border: 1px solid @primary-color;
        }
    }
</style>
