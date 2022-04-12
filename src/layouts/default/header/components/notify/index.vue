<template>
    <div :class="prefixCls">
        <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
            <Badge :count="count" dot :numberStyle="numberStyle">
                <!-- <BellOutlined /> -->
                <Icon icon="mdi:message-processing" />
            </Badge>
            <template #content>
                <div :class="prefixCls + '__header'">
                    <div :class="prefixCls + '__title'"> {{ t('layout.header.notifyTitle') }} </div>
                    <div :class="prefixCls + '__btns'">
                        <Button type="text" size="small">
                            {{ t('layout.header.notifyRead') }}
                        </Button>
                        <Button type="text" size="small">
                            {{ t('layout.header.notifyAll') }}
                            <MoreOutlined />
                        </Button>
                    </div>
                </div>
                <Tabs>
                    <template v-for="item in listData" :key="item.key">
                        <TabPane>
                            <template #tab>
                                {{ item.name }}
                                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
                            </template>
                            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
                            <NoticeList
                                :list="item.list"
                                v-if="item.key === '1'"
                                @title-click="onNoticeClick"
                            />
                            <NoticeList :list="item.list" v-else />
                        </TabPane>
                    </template>
                </Tabs>
            </template>
        </Popover>
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import { Popover, Tabs, Badge, Button } from 'ant-design-vue';
    import { BellOutlined, MoreOutlined } from '@ant-design/icons-vue';
    import { tabListData, ListItem } from './data';
    import NoticeList from './NoticeList.vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useMessage } from '/@/hooks/web/useMessage';
    import { Icon } from '/@/components/Icon';
    import { useI18n } from '/@/hooks/web/useI18n';

    export default defineComponent({
        components: {
            Popover,
            BellOutlined,
            MoreOutlined,
            Tabs,
            TabPane: Tabs.TabPane,
            Badge,
            NoticeList,
            Icon,
            Button,
        },
        setup() {
            const { prefixCls } = useDesign('header-notify');
            const { createMessage } = useMessage();
            const { t } = useI18n();
            const listData = ref(tabListData);

            const count = computed(() => {
                let count = 0;
                for (let i = 0; i < tabListData.length; i++) {
                    count += tabListData[i].list.length;
                }
                return count;
            });

            function onNoticeClick(record: ListItem) {
                createMessage.success('你点击了通知，ID=' + record.id);
                // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
                record.titleDelete = !record.titleDelete;
            }

            return {
                prefixCls,
                listData,
                count,
                onNoticeClick,
                numberStyle: {},
                t,
            };
        },
    });
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-header-notify';

    .@{prefix-cls} {
        padding-top: 2px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
        }

        &__title {
            font-size: 16px;
            color: #000;
        }

        &__btns {
            .ant-btn {
                font-size: 12px;
            }
        }

        &__overlay {
            width: 360px;

            .ant-tabs-bar {
                margin-bottom: 10px;
                border: 0;
            }

            .ant-tabs-ink-bar {
                display: none !important;
            }

            .ant-tabs-nav-container,
            .ant-tabs-nav-wrap {
                margin-bottom: 0;
            }
            .ant-tabs-nav {
                .ant-tabs-tab {
                    background: #f7f7f7;
                    padding: 6px 12px;
                    margin: 0 10px 0 0;
                    border-radius: 5px;
                }
            }
            // .ant-tabs-content {
            //     width: 300px;
            // }
            @border-radius: 10px;
            @filter: 8px;
            .ant-popover-inner {
                background: transparent;
                border-radius: @border-radius;
                z-index: 1;

                &::after {
                    content: ' ';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: @border-radius;

                    background: rgba(255, 255, 255, 0.9);
                    -webkit-filter: blur(@filter);
                    -moz-filter: blur(@filter);
                    -ms-filter: blur(@filter);
                    -o-filter: blur(@filter);
                    filter: blur(@filter);
                    z-index: -1;
                }
            }
        }

        .ant-badge {
            font-size: 18px;

            .ant-badge-multiple-words {
                padding: 0 4px;
            }

            svg {
                width: 0.9em;
            }
        }
    }
    [data-theme='dark'] {
        .@{prefix-cls} {
            &__overlay {
                .ant-tabs-nav {
                    .ant-tabs-tab {
                        background: #2f2f2f;
                    }
                }
                .ant-popover-inner {
                    &::after {
                        background: rgba(0, 0, 0, 0.9);
                    }
                }
            }
            &__title {
                color: #e4e4e4;
            }
        }
    }
</style>
