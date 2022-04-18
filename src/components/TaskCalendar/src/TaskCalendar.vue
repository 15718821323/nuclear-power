<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 日历组件
 * @Date: 2022-04-10 12:14:16
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-18 22:15:49
 * @FilePath: /nuclear-power/src/components/TaskCalendar/src/TaskCalendar.vue
-->
<template>
    <div class="task-calendar" id="taskCalendar">
        <SimpleCard :onMore="handlerMore" title="任务日历" icon="ant-design:container-filled">
            <div class="task-calendar-body">
                <Calendar :value="nowTime" @panelChange="panelChange">
                    <template #headerRender="{ value, onChange }">
                        <div class="calendar-header">
                            <div class="date-select">
                                <MonthPicker v-model:value="nowTime" :format="'YYYY年MM月'">
                                    <!-- <template #suffixIcon>
                                        <RightOutlined />
                                    </template> -->
                                    <span class="month-picker-trigger">
                                        {{ nowTime.format('YYYY年MM月') }} <RightOutlined />
                                    </span>
                                </MonthPicker>
                                <!-- <Select
                                    size="small"
                                    :dropdown-match-select-width="false"
                                    class="my-year-select"
                                    :value="String(value.year())"
                                    @change="
                                        (newYear) => {
                                            onChange(value.clone().year(newYear));
                                        }
                                    "
                                >
                                    <SelectOption
                                        v-for="val in getYears(value)"
                                        :key="String(val)"
                                        class="year-item"
                                    >
                                        {{ val }}年
                                    </SelectOption>
                                </Select>
                                <Select
                                    size="small"
                                    :dropdown-match-select-width="false"
                                    :value="String(value.month())"
                                    @change="
                                        (selectedMonth) => {
                                            onChange(
                                                value.clone().month(parseInt(selectedMonth, 10)),
                                            );
                                        }
                                    "
                                >
                                    <SelectOption
                                        v-for="(val, index) in getMonths(value)"
                                        :key="String(index)"
                                        class="month-item"
                                    >
                                        {{ val }}
                                    </SelectOption>
                                </Select> -->
                            </div>
                            <div class="change-month">
                                <Button
                                    type="primary"
                                    size="small"
                                    shape="circle"
                                    @click="
                                        () => {
                                            onChange(value.clone().subtract(1, 'month'));
                                        }
                                    "
                                >
                                    <Icon icon="ant-design:left-outlined" />
                                </Button>
                                <Button
                                    type="primary"
                                    size="small"
                                    shape="circle"
                                    @click="
                                        () => {
                                            onChange(value.clone().add(1, 'month'));
                                        }
                                    "
                                >
                                    <Icon icon="ant-design:right-outlined" />
                                </Button>
                            </div>
                        </div>
                    </template>
                    <template #dateCellRender="{ current }">
                        <Popover
                            trigger="click"
                            @visibleChange="visibleChange"
                            :overlayClassName="'task-popover'"
                            :getPopupContainer="getPopupContainer"
                        >
                            <template #title>
                                <span class="task-title"> {{ activeTask.title }} </span>
                                <span class="task-more" @click="handlerTaskMore(current)">
                                    更多 <MoreOutlined />
                                </span>
                            </template>
                            <template #content>
                                <div class="task-list">
                                    <template
                                        v-if="activeTask.content && activeTask.content.length > 0"
                                    >
                                        <div
                                            class="task-list-item"
                                            v-for="(task, key) in activeTask.content"
                                            :key="key"
                                            :class="taskStateClassCpt(task)"
                                            @click="
                                                () => {
                                                    task.onClick && task.onClick(task);
                                                }
                                            "
                                        >
                                            <span class="type">
                                                <CheckCircleFilled v-if="task.state == 1" />
                                                <ClockCircleFilled
                                                    v-else-if="task.state == 2 || 3"
                                                />
                                            </span>
                                            <span class="time"> {{ task.time }} </span>
                                            <span class="content"> {{ task.title }} </span>
                                            <span class="icon">
                                                <EyeFilled />
                                            </span>
                                        </div>
                                        <div class="footer">
                                            <Badge
                                                v-for="state in props.stateList"
                                                :key="state.code"
                                                :color="state.color"
                                                :text="state.title"
                                            />
                                        </div>
                                    </template>
                                    <span v-else class="empty">(无)</span>
                                </div>
                            </template>
                            <Button
                                class="tag"
                                @click="queryTaskDetail(current)"
                                :style="{
                                    background: tagCpt(current),
                                }"
                                v-if="tagCpt(current)"
                            >
                                {{ dateCpt(current) }}
                            </Button>
                        </Popover>
                    </template>
                </Calendar>
            </div>
        </SimpleCard>
    </div>
</template>

<script lang="ts" setup>
    import {
        MoreOutlined,
        EyeFilled,
        CheckCircleFilled,
        ClockCircleFilled,
        LeftOutlined,
        RightOutlined,
    } from '@ant-design/icons-vue';
    import { computed, unref, ref, watch, onMounted, reactive } from 'vue';
    import {
        Calendar,
        Badge,
        Popover,
        Button,
        Select,
        SelectOption,
        MonthPicker,
    } from 'ant-design-vue';
    import moment, { Moment } from 'moment';
    import { log } from 'console';
    import { SimpleCard } from '/@/components/SimpleCard';
    import Icon from '/@/components/Icon';

    moment.updateLocale('zh-cn', {
        weekdaysMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    });

    const props = defineProps({
        loading: Boolean,
        height: {
            type: String as PropType<string>,
            default: '300px',
        },
        taskDays: {
            type: Array,
            default: () => [],
        },
        // 状态字典
        stateList: {
            type: Array,
            default: () => {
                return [
                    { code: '1', title: '未开始', color: '#F7C464' },
                    { code: '2', title: '进行中', color: '#1A4F9C' },
                    { code: '3', title: '已完成', color: '#77DB6A' },
                ];
            },
        },
    });

    // const nowTime = ref<Moment>(moment());
    const nowTime = ref<Moment>(moment());

    // 激活日期的任务详情
    const activeTask = reactive({
        title: '',
        content: [],
    });

    onMounted(() => {
        setTask(nowTime.value);
    });

    const emit = defineEmits(['onMore', 'getTaskList', 'onTaskMore']);
    function handlerMore() {
        emit('onMore');
    }
    // 日期面板变化回调
    function panelChange(date: Moment, mode) {
        nowTime.value = date;
        setTask(date);
    }

    // 获取日历任务数据
    function setTask(date) {
        const time = date.format('YYYY-MM');
        console.log('获取 ' + time + '任务日期安排数据');
        emit('getTaskList', time);
    }

    // 渲染tag颜色
    const tagCpt = computed(() => {
        return (date: Moment) => {
            let color;
            const time = date.format('YYYY-MM-DD');
            const dayData = [...props.taskDays];
            const day = dayData.find((item) => item.day == time);
            if (day) {
                const list = [...props.stateList];
                const state = list.find((item) => item.code == day.state);
                if (state) {
                    color = state.color;
                }
            }
            return color;
        };
    });
    // 渲染tag文字
    const dateCpt = computed(() => {
        return (date: Moment) => {
            const day = date.date().toString();
            return day.length > 1 ? day : '0' + day;
        };
    });

    // 点击标记 查询任务详情
    function queryTaskDetail(date: Moment) {
        const time = date.format('YYYY-MM-DD');
        activeTask.title = date.format('YYYY年MM月DD日');
        activeTask.content = [];

        const data = props.taskDays.find((item) => item.day == time);
        data.taskList.forEach((item) => {
            activeTask.content.push({ ...item });
        });
    }

    // 任务气泡显示隐藏回调
    function visibleChange(visible) {
        if (!visible) {
            activeTask.content = [];
        }
    }

    // 渲染class
    const taskStateClassCpt = computed(() => {
        return (task) => {
            let className = '';
            if (task.state == '1') {
                className = 'task-state-1';
            } else if (task.state == '2') {
                className = 'task-state-2';
            } else if (task.state == '3') {
                className = 'task-state-3';
            }
            return className;
        };
    });

    // 任务列表 更多
    function handlerTaskMore(date: Moment) {
        emit('onTaskMore', date.format('YYYY-MM-DD'));
    }

    function getPopupContainer() {
        return document.querySelector('#taskCalendar');
    }

    const getMonths = (value: Moment) => {
        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
        }
        return months;
    };

    const getYears = (value: Moment) => {
        const year = value.year();
        const years = [];
        for (let i = year - 10; i < year + 10; i += 1) {
            years.push(i);
        }
        return years;
    };
</script>

<style lang="less" scoped>
    .task-calendar {
        height: calc(~'100% - 191px');
        &-body {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        :deep(.ant-fullcalendar-fullscreen) {
            .ant-fullcalendar-month,
            .ant-fullcalendar-date {
                height: 0;
                margin: 0;
                padding: 100% 0 0 0;
                border-top: 0;
                border-radius: 5px;
                overflow: hidden;
                position: relative;

                .ant-fullcalendar-value {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    background: transparent !important;

                    width: 100%;
                    height: 100%;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .ant-fullcalendar-header {
                padding: 11px 16px;

                .ant-select-selector {
                    border: 0 !important;
                    box-shadow: none !important;
                }
                .ant-select.ant-fullcalendar-month-select,
                .ant-select.ant-fullcalendar-year-select {
                    min-width: auto;
                }
            }
            .ant-fullcalendar-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;

                width: 50%;
                height: 50%;
                min-width: 30px;
                min-height: 30px;
                overflow: hidden;
                transition: all 0.2s;
                .tag {
                    display: block;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    color: white;
                    border: none !important;
                    transition: all 0.2s;
                }
            }
        }
        .calendar-header {
            margin-bottom: 10px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .date-select {
                :deep(.ant-select-selector) {
                    border: 0 !important;
                    box-shadow: none !important;
                }
            }
            .change-month {
                :deep(.ant-btn) {
                    margin-left: 10px;
                }
            }
        }
        .task-popover {
            border-radius: 10px;
            overflow: hidden;
            .task-list {
                width: 100%;
                &-item {
                    width: 100%;
                    padding: 3px 20px 3px 8px;
                    position: relative;
                    border-top-right-radius: 20px;
                    border-bottom-right-radius: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    cursor: pointer;
                    line-height: 2.2;

                    margin-bottom: 10px;

                    .time {
                        padding: 0 5px;
                    }
                    .icon {
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                    }

                    &.task-state-1 {
                        background: #eafee8;
                        border-left: 3px solid #77db6a;
                        color: #77db6a;
                    }
                    &.task-state-2 {
                        background: #e2effd;
                        border-left: 3px solid #1a4f9c;
                        color: #1a4f9c;
                    }
                    &.task-state-3 {
                        background: #fcf1e1;
                        border-left: 3px solid #f7c362;
                        color: #f7c362;
                    }
                }
                .footer {
                    :deep(.ant-badge) {
                        font-size: 12px;
                        &:not(:last-of-type) {
                            margin-right: 15px;
                        }
                    }
                    :deep(.ant-badge-status-text) {
                        font-size: inherit;
                    }
                }
            }
        }
        :deep(.ant-popover-title) {
            background: rgba(50, 120, 255, 0.18);
            backdrop-filter: blur(21px);
            padding: 10px 16px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            @more-width: 50px;
            .task-title {
                width: calc(~'100% - @{more-width}');
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
            }
            .task-more {
                display: block;
                width: @more-width;
                cursor: pointer;
                color: #999;
                font-size: 12px;
                transition: all 0.2s;
                &:active,
                &:hover {
                    color: #333;
                }
            }
        }

        :deep(.ant-popover-content) {
            border-radius: 12px;
            overflow: hidden;
        }

        @filter: 12px;
        :deep(.ant-popover-inner) {
            background: transparent;

            overflow: hidden;
            width: 280px;
            z-index: 1;
            &:after {
                content: ' ';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;

                background: rgba(255, 255, 255, 0.8);
                -webkit-filter: blur(@filter);
                -moz-filter: blur(@filter);
                -ms-filter: blur(@filter);
                -o-filter: blur(@filter);
                filter: blur(@filter);
                z-index: -1;
            }
        }

        :deep(.ant-fullcalendar-header) {
            text-align: left;
            .ant-radio-group {
                display: none;
            }
        }

        :deep(.ant-fullcalendar-column-header .ant-fullcalendar-column-header-inner) {
            text-align: center;
            font-size: 14px;
            font-weight: 700;
        }
    }

    :deep(.month-picker-trigger) {
        cursor: pointer;
        font-size: 18px;
        font-family: Poppins, Poppins-Medium;
        font-weight: 500;
        text-align: LEFT;
        color: #333;

        .anticon {
            transition: all 0.2s;
            color: @primary-color;
            opacity: 0.7;
        }
        &:hover {
            .anticon {
                opacity: 1;
            }
        }
    }

    [data-theme='dark'] {
        // .task-calendar {
        //     :deep(.ant-popover-inner) {
        //         &:after {
        //             background: rgba(0, 0, 0, 0.9);
        //         }
        //     }
        // }
        .task-calendar-header-title {
            color: #e4e4e4;
        }
        .shortcut-menu-body .menu-item:hover .menu-item-title {
            color: #e4e4e4;
        }
    }
</style>
