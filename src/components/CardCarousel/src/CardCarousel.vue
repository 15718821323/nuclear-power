<template>
    <div class="card-carousel">
        <Carousel>
            <div class="card-group" v-for="(group, key) in cardGroups" :key="key">
                <div class="card-item" v-for="(item, index) in group" :key="index">
                    <div class="card-item-inner">
                        <div class="card-item-header">
                            <div class="card-item-header-title">
                                <div class="title">{{ item.title }}</div>
                                <div class="more" @click="handlerMore"> 详情 <MoreOutlined /> </div>
                            </div>
                            <div class="card-item-header-time">{{ item.time }}</div>
                        </div>
                        <div class="card-item-body">
                            <div class="task-ass">
                                <div class="task-leader">
                                    <span class="avatar" :style="{ background: colors[2] }">
                                        {{ item.leader }}
                                    </span>
                                    <span class="title">下达人</span>
                                </div>
                                <div class="task-performer">
                                    <div class="avatar-group">
                                        <span
                                            class="avatar"
                                            v-for="(performer, pIndex) in performerCpt(item)"
                                            :style="{ background: colors[pIndex] }"
                                            :key="pIndex"
                                        >
                                            {{ performer }}
                                        </span>
                                    </div>
                                    <span class="title">
                                        执行人 · {{ item.performer.length }}人
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="card-item-footer">
                            <template v-for="(btn, bkey) in item.footBtns" :key="bkey">
                                <Button
                                    v-bind="Object.assign({ size: 'small' }, btn.props)"
                                    @click="btn.onClick"
                                    >{{ btn.text }}</Button
                                >
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    </div>
</template>

<script lang="ts" setup>
    import { MoreOutlined } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref } from 'vue';
    import { Button } from '/@/components/Button';
    import { Carousel } from '/@/components/Carousel';
    import { useAttrs } from '/@/hooks/core/useAttrs';

    const props = defineProps({
        list: {
            type: Array,
            default: () => [],
        },
    });

    const cardGroups = computed(() => {
        const list = unref(props.list);
        let group = [];
        const groupList = [];
        list.forEach((item, index) => {
            group.push(item);
            if ((index + 1) % 3 === 0) {
                groupList.push(group);
                group = [];
            }
        });
        if (group.length) {
            groupList.push(group);
        }
        return groupList;
    });

    const colors = ['#19cd64', '#fe9b19', '#0053d4', '#661ffd', '#8c8c8c'];

    // 处理超长的执行人，保留5个
    const performerCpt = computed(() => {
        return (item) => {
            const performer = unref(item.performer);
            if (performer) {
                if (performer.length > 5) {
                    return performer.slice(0, 4).concat('···');
                }
                return performer;
            }
            return [];
        };
    });

    // 详情按钮点击事件
    const handlerMore = () => {
        console.log('handlerMore');
    };
</script>

<style lang="less" scoped>
    .card-carousel {
        .card-group {
            display: inline-flex !important;

            .card-item {
                width: 300px;
                padding: 0 10px;
                .card-item-inner {
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    padding: 20px;
                }
                &-header {
                    &-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;

                        @more-width: 45px;
                        .title {
                            width: calc(~'100% - @{more-width}');
                            font-size: 18px;
                            font-weight: 700;
                            text-align: left;
                            color: #333;
                            line-height: 18px;
                        }
                        .more {
                            width: @more-width;
                            color: #9e9e9e;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.2s;

                            &:hover,
                            &:focus {
                                color: @primary-color;
                            }
                        }
                    }
                    &-time {
                        color: #4d4d4d;
                        font-size: 12px;
                    }
                }
                &-body {
                    .task-ass {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px 0;

                        @size: 30px;
                        .task-leader,
                        .task-performer {
                            position: relative;
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            .avatar-group {
                                display: flex;
                                justify-content: center;
                                margin-bottom: -5px;
                            }
                            .avatar {
                                display: inline-flex;
                                justify-content: center;
                                align-items: center;
                                width: @size;
                                height: @size;
                                text-align: center;
                                font-size: 12px;
                                border: 1px solid white;
                                border-radius: 50%;
                                color: white;
                                overflow: hidden;
                            }
                            .avatar + .avatar {
                                margin-left: -9%;
                            }
                            .title {
                                display: block;
                                width: 100%;
                                color: white;
                                font-size: 12px;
                                background: #393a3e;
                                text-align: center;
                                border-radius: 20px;
                                padding: 0 5px;
                            }
                        }

                        .task-leader {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            .avatar {
                                margin-bottom: -5px;
                            }
                        }
                        .task-performer {
                            &-item {
                                margin-left: -5px;
                            }
                        }
                    }
                }
                &-footer {
                    text-align: right;
                    :deep(.ant-btn) {
                        &:not(:last-of-type) {
                            margin-right: 10px;
                        }
                        &.ant-btn-primary:not(.ant-btn-background-ghost) {
                            background: rgba(24, 135, 255, 0.24);
                            border-color: #004ea2;
                            color: #004ea2;

                            &:hover,
                            &:focus {
                                background: #004ea2;
                                color: white;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
