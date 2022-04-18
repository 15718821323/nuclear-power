<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 我的门户
 * @Date: 2022-04-02 14:28:54
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-18 22:31:55
 * @FilePath: /nuclear-power/src/views/personalPortal/personalPortal/myPortal/MyPortal.vue
-->
<template>
    <PageWrapper>
        <div class="my-portal">
            <ARow :gutter="gutter" class="entry-x">
                <ACol :span="16">
                    <Carousel class="banner" :loading="loading">
                        <img
                            class="banner-item"
                            :src="banner.src"
                            alt=""
                            v-for="(banner, key) in bannerList"
                            :key="key"
                        />
                    </Carousel>
                    <ARow :gutter="gutter" class="entry-x my-4">
                        <ACol :span="12">
                            <ProgressPanel :list="list1" :loading="loading" />
                        </ACol>
                        <ACol :span="12">
                            <NewsList
                                :list="newsList"
                                @handleMore="handleMore"
                                @handleClickItem="handleNewsItemClick"
                                :loading="loading"
                            />
                        </ACol>
                    </ARow>
                    <ARow :gutter="gutter" class="entry-x my-4">
                        <ACol :span="24">
                            <CardCarousel :list="cardList" @onMore="taskMore" :loading="loading" />
                        </ACol>
                    </ARow>
                </ACol>
                <ACol :span="8">
                    <ShortcutMenu :menuList="menuList" @onMore="taskMore" :loading="loading" />
                    <TaskCalendar
                        class="my-4"
                        :height="'600px'"
                        :taskDays="taskDays"
                        :loading="loading"
                        :stateList="stateList"
                        @getTaskList="getTaskList"
                        @onMore="taskCalendarMore"
                        @onTaskMore="taskListMore"
                    />
                </ACol>
            </ARow>
            <Row :gutter="gutter" class="entry-x">
                <ACol :span="8">
                    <FileList :fileList="fileList" @onMore="fileMore" :loading="loading" />
                </ACol>
                <ACol :span="16">
                    <AnnualCompletion
                        :pieData="pieData"
                        :lineData="lineData"
                        @onMore="annualMore"
                        :loading="loading"
                        :width="'100%'"
                        :height="'100%'"
                    />
                </ACol>
            </Row>
        </div>
    </PageWrapper>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue';
    import { Card, Row, Col } from 'ant-design-vue';
    import {
        LeftCircleOutlined,
        RightCircleOutlined,
        FileDoneOutlined,
    } from '@ant-design/icons-vue';
    import { PageWrapper } from '/@/components/Page';
    import { Carousel } from '/@/components/Carousel';

    import { ProgressPanel } from '/@/components/ProgressPanel';
    import { NewsList } from '/@/components/NewsList';
    import { CardCarousel } from '/@/components/CardCarousel';
    import { ShortcutMenu } from '/@/components/ShortcutMenu';
    import { FileList } from '/@/components/FileList';
    import { AnnualCompletion } from '/@/components/AnnualCompletion';
    import { TaskCalendar } from '/@/components/TaskCalendar';

    // 导入本地图片
    import banner1 from '/@/assets/images/myPortal/banner1.png';
    import banner2 from '/@/assets/images/myPortal/banner2.png';

    import progressPanel1 from '/@/assets/images/myPortal/progressPanel/1.png';
    import progressPanel2 from '/@/assets/images/myPortal/progressPanel/2.png';
    import progressPanel3 from '/@/assets/images/myPortal/progressPanel/3.png';
    import progressPanel4 from '/@/assets/images/myPortal/progressPanel/4.png';

    const loading = ref(true);

    const gutter = ref(16);
    const bannerList = ref([
        {
            src: banner1,
        },
        {
            src: banner2,
        },
    ]);
    const list1 = ref([
        {
            iconSrc: progressPanel1,
            title: '待办事项',
            percent: '100',
            label: '12',
            dropdown: [
                {
                    text: '查看',
                    icon: 'akar-icons:file',
                    onClick: () => {
                        console.log('查看待办事项');
                    },
                },
            ],
        },
        {
            iconSrc: progressPanel2,
            title: '已办事项',
            percent: '30',
            label: '2',
            dropdown: [
                {
                    text: '查看',
                    icon: 'akar-icons:file',
                    onClick: () => {
                        console.log('查看已办事项');
                    },
                },
            ],
        },
        {
            iconSrc: progressPanel3,
            title: '委托事项',
            percent: '30',
            label: '1',
            dropdown: [
                {
                    text: '查看',
                    icon: 'akar-icons:file',
                    onClick: () => {
                        console.log('委托事项');
                    },
                },
            ],
        },
        {
            iconSrc: progressPanel4,
            title: '超时事项',
            percent: '80',
            label: '2',
            dropdown: [
                {
                    text: '查看',
                    icon: 'akar-icons:file',
                    onClick: () => {
                        console.log('查看超时事项');
                    },
                },
            ],
        },
    ]);

    const newsList = ref([
        {
            type: '公告',
            title: '中核工程“华龙一号”研发团队获“中国质量奖”',
            time: '2022-04-01',
            top: true,
        },
        {
            type: '新闻',
            title: '中核集团2022年4月核电项目设计计划',
            time: '2022-04-02',
        },
        {
            type: '新闻',
            title: '中核集团提升122位！中核集团再度入选世界500强',
            time: '2022-04-03',
        },
    ]);

    const cardList = ref([
        {
            title: '1号核电站升级改造',
            time: '2020-04-01',
            percent: 82,
            leader: 'KA',
            performer: ['张三', '李四', '王五'],
            footBtns: [
                {
                    text: '拒绝',
                    props: {
                        type: 'primary',
                        ghost: true,
                    },
                    onClick: () => {
                        console.log('拒绝');
                    },
                },
                {
                    text: '同意',
                    props: {
                        type: 'primary',
                    },
                    onClick: () => {
                        console.log('同意');
                    },
                },
            ],
            handlerDetail: () => {
                console.log('1号-查看详情');
            },
        },
        {
            title: '2号核电站升级改造',
            time: '2020-04-01',
            percent: 82,
            leader: 'KA',
            performer: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九'],
            footBtns: [
                {
                    text: '查看详情',
                    props: {
                        type: 'primary',
                    },
                    onClick: () => {
                        console.log('查看详情');
                    },
                },
            ],
            handlerDetail: () => {
                console.log('查看详情');
            },
        },
        {
            title: '3号核电站升级改造',
            time: '2020-04-01',
            percent: 8,
            leader: 'KA',
            performer: ['张三', '李四'],
            footBtns: [
                {
                    text: '拒绝',
                    props: {
                        type: 'primary',
                        ghost: true,
                    },
                    onClick: () => {
                        console.log('拒绝');
                    },
                },
                {
                    text: '同意',
                    props: {
                        type: 'primary',
                    },
                    onClick: () => {
                        console.log('同意');
                    },
                },
            ],
            handlerDetail: () => {
                console.log('查看详情');
            },
        },
        {
            title: '4号核电站升级改造',
            time: '2020-04-01',
            percent: 8,
            leader: 'KA',
            performer: ['张三', '李四', '王五', '赵六'],
            footBtns: [
                {
                    text: '拒绝',
                    props: {
                        type: 'primary',
                        ghost: true,
                    },
                    onClick: () => {
                        console.log('拒绝');
                    },
                },
                {
                    text: '同意',
                    props: {
                        type: 'primary',
                    },
                    onClick: () => {
                        console.log('同意');
                    },
                },
            ],
            handlerDetail: () => {
                console.log('查看详情');
            },
        },
    ]);

    const menuList = ref([
        {
            img: '/@/assets/images/myPortal/shortcutMenu/news.png',
            title: '新闻平台',
            onClick: () => {
                console.log('新闻平台');
            },
        },
        {
            img: '/@/assets/images/myPortal/shortcutMenu/purchase.png',
            title: '采购平台',
            onClick: () => {
                console.log('采购平台');
            },
        },
        {
            img: '/@/assets/images/myPortal/shortcutMenu/data.png',
            title: '数据管理',
            onClick: () => {
                console.log('数据管理');
            },
        },
        {
            img: '/@/assets/images/myPortal/shortcutMenu/protect.png',
            title: '防护平台',
            onClick: () => {
                console.log('防护平台');
            },
        },
        {
            img: '/@/assets/images/myPortal/shortcutMenu/approve.png',
            title: '审批平台',
            onClick: () => {
                console.log('审批平台');
            },
        },
        {
            img: '/@/assets/images/myPortal/shortcutMenu/download.png',
            title: '下载平台',
            onClick: () => {
                console.log('下载平台');
            },
        },
    ]);
    const fileList = ref([
        {
            type: 'excel',
            title: '中核集团内部财务报表.Excel',
            content:
                '中核集团是中核集团的下属单位之一，拥有先进的核研发技术，拥有先进的核研发技术拥有先进的核研发技术。',
            time: '2022-04-06',
            onClick: () => {
                console.log('中核集团内部财务报表.Excel');
            },
        },
        {
            type: 'word',
            title: '广州市核电站设计图纸及文档.Word',
            content:
                '中核集团是中核集团的下属单位之一，拥有先进的核研发技术，拥有先进的核研发技术拥有先进的核研发技术。',
            time: '2022-04-01',
            onClick: () => {
                console.log('广州市核电站设计图纸及文档.Word');
            },
        },
        {
            type: 'ppt',
            title: '中核汇能2022内部年会汇报演示稿.ppt',
            content:
                '中核集团是中核集团的下属单位之一，拥有先进的核研发技术，拥有先进的核研发技术拥有先进的核研发技术。',
            time: '2022-04-01',
            onClick: () => {
                console.log('中核汇能2022内部年会汇报演示稿.ppt');
            },
        },
        {
            type: 'image',
            title: '广州市2022核电站施工图及现场勘测照片',
            content:
                '中核集团是中核集团的下属单位之一，拥有先进的核研发技术，拥有先进的核研发技术拥有先进的核研发技术。',
            time: '2022-04-01',
            onClick: () => {
                console.log('广州市2022核电站施工图及现场勘测照片');
            },
        },
        {
            type: 'word',
            title: '河北省邯郸市核电站设计图纸及文档.Word',
            content:
                '中核集团是中核集团的下属单位之一，拥有先进的核研发技术，拥有先进的核研发技术拥有先进的核研发技术。',
            time: '2022-03-12',
            onClick: () => {
                console.log('河北省邯郸市核电站设计图纸及文档.Word');
            },
        },
    ]);

    const pieData = ref({
        title: '本年度执行任务',
        data: [
            { value: 1048, name: '进行中' },
            { value: 735, name: '已阅读' },
            { value: 580, name: '已延期' },
            { value: 484, name: '已取消' },
            { value: 100, name: '未开始' },
        ],
    });
    const lineData = ref({
        title: '年度任务执行情况',
        data: [
            {
                title: '今年',
                data: [110, 232, 101, 264, 90, 340, 250, 140, 232, 101, 264, 90],
            },
            {
                title: '去年',
                data: [120, 282, 111, 234, 220, 340, 310, 120, 282, 111, 234, 220],
            },
            {
                title: '前年',
                data: [220, 402, 231, 134, 190, 230, 120, 220, 402, 231, 134, 190],
            },
        ],
    });

    // 任务日历中的状态字典
    const stateList = ref([
        { code: '1', title: '未开始', color: '#F7C464' },
        { code: '2', title: '进行中', color: '#1A4F9C' },
        { code: '3', title: '已完成', color: '#77DB6A' },
    ]);
    // 任务日历数据，接收日程安排，具体内容当天点击事件回调处理
    const taskDays = ref([]);
    // *********************** ↓↓ 新闻 ↓↓ *********************** //
    // 更多
    function handleMore() {
        console.log('查看更多');
    }
    // 新闻项点击事件
    function handleNewsItemClick(item) {
        console.log('新闻项点击事件', item);
    }
    // *********************** ↑↑ 新闻 ↑↑ *********************** //
    // *********************** ↓↓ 任务面板 ↓↓ *********************** //
    function taskMore() {
        console.log('查看更多任务');
    }
    // *********************** ↑↑ 任务面板 ↑↑ *********************** //
    // *********************** ↓↓ 文档资料 ↓↓ *********************** //
    function fileMore() {
        console.log('查看更多文档资料');
    }
    // *********************** ↑↑ 文档资料 ↑↑ *********************** //
    // *********************** ↓↓ 年度完成情况 ↓↓ *********************** //
    function annualMore() {
        console.log('查看更多年度完成情况');
    }
    // *********************** ↑↑ 年度完成情况 ↑↑ *********************** //
    // *********************** ↓↓ 任务日历 ↓↓ *********************** //
    function taskCalendarMore() {
        console.log('查看更多任务日历');
    }
    function getTaskList(time) {
        taskDays.value = [
            {
                day: '2022-04-01',
                state: '1',
                taskList: [
                    {
                        title: '明早8点部门开例会',
                        time: '8:00',
                        state: '1',
                        onClick: () => {
                            console.log('明早8点部门开例会');
                        },
                    },
                    {
                        title: '技术研发部需求讨论会议',
                        time: '12:00',
                        state: '2',
                        onClick: () => {
                            console.log('技术研发部需求讨论会议');
                        },
                    },
                    {
                        title: '公司年会节目申报',
                        time: '16:00',
                        state: '3',
                        onClick: () => {
                            console.log('公司年会节目申报');
                        },
                    },
                ],
            },
            {
                day: '2022-04-15',
                state: '2',
                taskList: [
                    {
                        title: '明早8点部门开例会',
                        time: '8:00',
                        state: '1',
                        onClick: () => {
                            console.log('明早8点部门开例会');
                        },
                    },
                    {
                        title: '技术研发部需求讨论会议',
                        time: '12:00',
                        state: '2',
                        onClick: () => {
                            console.log('技术研发部需求讨论会议');
                        },
                    },
                    {
                        title: '公司年会节目申报',
                        time: '16:00',
                        state: '3',
                        onClick: () => {
                            console.log('公司年会节目申报');
                        },
                    },
                ],
            },
            {
                day: '2022-04-21',
                state: '3',
                taskList: [
                    {
                        title: '明早8点部门开例会',
                        time: '8:00',
                        state: '1',
                        onClick: () => {
                            console.log('明早8点部门开例会');
                        },
                    },
                    {
                        title: '技术研发部需求讨论会议',
                        time: '12:00',
                        state: '2',
                        onClick: () => {
                            console.log('技术研发部需求讨论会议');
                        },
                    },
                    {
                        title: '公司年会节目申报',
                        time: '16:00',
                        state: '3',
                        onClick: () => {
                            console.log('公司年会节目申报');
                        },
                    },
                ],
            },
        ];
        console.log('父级方法getTaskList', time);
        // 调用接口获取数据
        // [
        //     {
        //         day: '15', // 哪天 年月日中的日
        //         state: '0' // 任务状态 只接收一个，如果当天有多个任务，建议传入权重最高的任务状态
        //     },
        //     ...
        // ]
    }
    // 获取某天的更多任务
    function taskListMore(time) {
        console.log('查看' + time + '更多任务');
    }
    // *********************** ↑↑ 任务日历 ↑↑ *********************** //
    setTimeout(() => {
        loading.value = false;
    }, 1500);

    const ACol = Col;
    const ARow = Row;
</script>

<style lang="less" scoped>
    :deep(.vben-page-wrapper-content) {
        margin: 10px;
    }

    .banner {
        :deep(.slick-list) {
            border-radius: 14px;
            background: white;
            overflow: hidden;
        }
    }
</style>
