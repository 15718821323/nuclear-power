<template>
    <div class="card-carousel">
        <Carousel>
            <div class="card-group" v-for="(group, key) in cardGroups" :key="key">
                <div class="card-item" v-for="(item, index) in group" :key="index">
                    <div class="card-item-inner">
                        <div class="card-item-header">
                            <div class="card-item-header-title">
                                <div class="title">{{ item.title }}</div>
                                <div class="more" @click="handlerDetail(item)">
                                    详情 <MoreOutlined />
                                </div>
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
                                    <div class="avatar-group" :style="{ width: widthCpt(item) }">
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
                            <div class="task-progress">
                                <Progress
                                    :percent="item.percent"
                                    status="active"
                                    strokeColor="#5a8bff"
                                    :strokeWidth="4"
                                />
                            </div>
                        </div>
                        <div class="card-item-footer">
                            <template v-for="(btn, bkey) in item.footBtns" :key="bkey">
                                <Button
                                    v-bind="Object.assign({ size: 'small' }, btn.props)"
                                    @click="
                                        () => {
                                            btn.onClick && btn.onClick(item);
                                        }
                                    "
                                >
                                    {{ btn.text }}
                                </Button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
        <div class="right-container">
            <div class="right-content" @click="handlerMore">
                <div class="more"> 查看更多 <RightCircleOutlined /> </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { MoreOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
    import { Progress } from 'ant-design-vue';
    import { defineComponent, computed, unref } from 'vue';
    import { Button } from '/@/components/Button';
    import { Carousel } from '/@/components/Carousel';

    const props = defineProps({
        list: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(['onMore']);

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
    // 处理宽度
    const widthCpt = computed(() => {
        return (item) => {
            const performer = unref(item.performer);
            if (performer) {
                if (performer.length > 5) {
                    return '120px';
                }
                return `${(performer.length + 1) * 20}px`;
            }
            return '0px';
        };
    });

    // 详情按钮点击事件
    const handlerDetail = (item) => {
        console.log('详情');
        item.handlerDetail && item.handlerDetail();
    };
    const handlerMore = () => {
        console.log('查看更多');
        emit('onMore');
    };
</script>

<style lang="less" scoped>
    @right-width: 50px;
    @border-radius: 10px;
    .card-carousel {
        position: relative;
        padding-right: @right-width + 10px;

        :deep(.carousel-slick-arrow) {
            color: @primary-color;
            opacity: 0.4;
            transition: all 0.2s;
            &:hover,
            &:focus {
                opacity: 0.8;
            }
        }

        .right-container {
            width: @right-width;
            height: 100%;
            background: transparent;
            position: absolute;
            top: 0;
            right: 0;
            .right-content {
                width: 100%;
                height: 100%;
                border-radius: @border-radius;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                cursor: pointer;
                background: white;
                .more {
                    width: 1em;
                    font-size: 14px;
                    color: #424e66;
                    transition: all 0.2s;
                }
                &:hover,
                &:focus {
                    .more {
                        color: @primary-color;
                    }
                }
            }
        }
        .card-group {
            display: inline-flex !important;
            width: 100%;
            justify-content: space-between;
            .card-item {
                width: 32%;
                &:first-of-type {
                    padding-left: 0;
                }
                &:last-of-type {
                    padding-right: 0;
                }
                .card-item-inner {
                    width: 100%;
                    background: #fff;
                    border-radius: @border-radius;
                    overflow: hidden;
                    padding: 20px;
                }
                &-header {
                    width: 100%;
                    &-title {
                        display: flex;
                        width: 100%;
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
                            line-height: 1;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
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
                                margin-bottom: -3px;
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
                                margin-left: -3px;
                            }
                        }
                    }

                    .task-progress {
                        width: 100%;
                        margin-bottom: 2em;
                        :deep(.ant-progress-show-info) {
                            padding-top: 1em;
                            .ant-progress-outer {
                                margin-right: 0;
                                padding-right: 0;
                            }
                        }
                        :deep(.ant-progress-text) {
                            margin-left: 0;
                            position: absolute;
                            top: 0.5em;
                            right: 0;
                            color: #9e9e9e;
                            font-size: 12px;
                        }
                    }
                }
                &-footer {
                    text-align: right;
                    :deep(.ant-btn) {
                        &:not(:last-of-type) {
                            margin-right: 10px;
                        }
                        padding: 0 15px;
                        &.ant-btn-primary {
                            &:not(.ant-btn-background-ghost) {
                                color: #004ea2;
                                background: rgba(24, 135, 255, 0.24);
                                border: 1px solid #004ea2;
                                border-radius: 6px;
                                font-size: 12px;

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
    }
    [data-theme='dark'] {
        .card-carousel {
            .card-group {
                .card-item .card-item-inner {
                    background: #0d0d0d;
                }
                .card-item-header-title .title {
                    color: #e4e4e4;
                }
            }
            .right-container .right-content {
                background: #0d0d0d;
            }
        }
    }
</style>
