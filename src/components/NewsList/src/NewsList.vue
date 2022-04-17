<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 新闻列表
 * @Date: 2022-04-06 17:37:01
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-17 20:59:27
 * @FilePath: /nuclear-power/src/components/NewsList/src/NewsList.vue
-->
<template>
    <div class="news-list">
        <SimpleCard :onMore="toMore">
            <template v-slot:title>
                <span class="news-list-title">
                    <span>新闻</span>
                    <span>公告</span>
                </span>
            </template>
            <div class="news-list-body">
                <div
                    class="news-list-item"
                    v-for="(item, key) in list"
                    :class="{ top: item.top }"
                    :key="key"
                    @click="handleClickNews(item)"
                >
                    <div class="news-list-item-content">
                        <span class="type">[{{ item.type }}]</span>
                        {{ item.title }}
                    </div>
                    <div class="news-list-item-time"> {{ item.time }}</div>
                </div>
            </div>
        </SimpleCard>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';
    import { MoreOutlined } from '@ant-design/icons-vue';
    import { SimpleCard } from '/@/components/SimpleCard';

    const props = defineProps({
        list: {
            type: Array,
            default: () => [],
        },
    });

    const items = props.list;
    const emit = defineEmits(['handleMore', 'handleClickItem']);
    function toMore() {
        emit('handleMore');
    }
    function handleClickNews(item) {
        const { event } = item;
        const news = props.list.find((item) => `${item.event}` === `${event}`);
        emit('handleClickItem', news);
    }
</script>
<style lang="less" scoped>
    .news-list {
        &-title {
            display: inline-flex;
            line-height: 26px;
            overflow: hidden;

            @border-radius: 24px;
            span {
                display: block;
                height: 100%;
                padding: 0 10px;
                font-size: 18px;
                font-weight: 500;
                border: 1px solid @primary-color;
                &:first-of-type {
                    background: @primary-color;
                    color: white;
                    border-top-left-radius: @border-radius;
                    border-bottom-left-radius: @border-radius;
                }
                &:last-of-type {
                    background: transparent;
                    border-top-right-radius: @border-radius;
                    border-bottom-right-radius: @border-radius;
                }
            }
        }
        &-body {
            overflow: hidden;
            width: 100%;
            height: calc(~'38px * 3');
        }
        &-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            cursor: pointer;
            position: relative;
            font-size: 14px;

            @time-width: 7em;
            @icon-width: 20px;
            &.top {
                padding-left: @icon-width + 2px;
                &::before {
                    content: '顶';
                    display: block;
                    width: @icon-width;
                    text-align: center;
                    background: rgba(26, 66, 186, 0.25);
                    border-radius: 2px;
                    font-size: 12px;
                    color: #2a5fff;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            }
            &-content {
                display: block;
                width: calc(~'100% - @{time-width}');
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #333;

                .type {
                    color: #333;
                    font-weight: 600;
                }
            }
            &-time {
                display: block;
                width: @time-width;
                color: #4d4d4d;
                text-align: right;
            }
        }
    }

    [data-theme='dark'] {
        .news-list {
            .news-list-item-content {
                &,
                & .type {
                    color: #e4e4e4;
                }
            }
            &-item-time {
                color: #818181;
            }
        }
    }
</style>
