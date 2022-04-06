<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 我的门户
 * @Date: 2022-04-02 14:28:54
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-06 18:00:59
 * @FilePath: /nuclear-power/src/views/personalPortal/personalPortal/myPortal/MyPortal.vue
-->
<template>
    <PageWrapper>
        <div class="my-portal">
            <ARow :gutter="gutter" class="entry-x">
                <ACol :span="16">
                    <Carousel>
                        <div class="banner-item" v-for="(banner, key) in bannerList" :key="key">
                            <img :src="banner.src" alt="" />
                        </div>
                    </Carousel>
                    <ARow :gutter="gutter" class="entry-x">
                        <ACol :span="12">
                            <ProgressPanel :list="list1"> </ProgressPanel>
                        </ACol>
                        <ACol :span="12">
                            <NewsList :list="newsList" @handleMore="handleMore" @handleClickItem="handleNewsItemClick"/>
                        </ACol>
                    </ARow>
                </ACol>
                <ACol :span="8">v</ACol>
            </ARow>
            <Row :gutter="gutter"> </Row>
        </div>
    </PageWrapper>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
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

    const loading = ref(true);

    const gutter = ref(16);
    const bannerList = ref([
        {
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f2d159506b1fa8012193a31140bb.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651805331&t=ffca483e99de02720c9132b341ba8564',
        },
        {
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01427358c639fca801219c77b2c564.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651805373&t=a9b50726db250c9c8a7da9063f184049',
        },
    ]);
    const list1 = ref([
        {
            icon: 'akar-icons:file',
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
            icon: 'ant-design:file-done-outlined',
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
            icon: 'ant-design:file-add-outlined',
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
            icon: 'ant-design:field-time-outlined',
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

    // *********************** ↓↓ 新闻 ↓↓ *********************** //
    // 更多
    function handleMore() {
        console.log('查看更多');
    }
    // 新闻项点击事件
    function handleNewsItemClick(item) {
        console.log('新闻项点击事件',item);
    }
    // *********************** ↑↑ 新闻 ↑↑ *********************** //
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

    :deep(.slick-list) {
        border-radius: 14px;
        overflow: hidden;
    }
</style>
