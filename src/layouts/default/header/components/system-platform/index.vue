<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 系统平台 菜单
 * @Date: 2022-04-11 22:48:21
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-12 01:18:36
 * @FilePath: /nuclear-power/src/layouts/default/header/components/system-platform/index.vue
-->
<template>
    <div @click="openDrawer(true)" :class="prefixCls">
        <img class="icon" src="/@/assets/images/header/menu.png" alt="" />
        <BasicDrawer
            @register="register"
            :title="'系统平台'"
            :width="460"
            wrapClassName="platform-drawer"
        >
            <div class="system-platform-list">
                <div
                    class="system-platform-item"
                    v-for="(menu, key) in menuList"
                    :key="key"
                    @click="
                        () => {
                            menu.onClick && menu.onClick();
                        }
                    "
                >
                    <div class="system-platform-item-container">
                        <div class="system-platform-item-icon">
                            <img :src="menu.img" alt="" />
                        </div>
                        <div class="system-platform-item-title">
                            {{ menu.title }}
                        </div>
                    </div>
                </div>
            </div>
        </BasicDrawer>
    </div>
</template>
<script lang="ts">
    import { defineComponent, unref } from 'vue';
    // import SettingDrawer from './SettingDrawer';
    import { BasicDrawer } from '/@/components/Drawer/index';
    import Icon from '/@/components/Icon';
    import { useDesign } from '/@/hooks/web/useDesign';

    import { useDrawer } from '/@/components/Drawer';

    export default defineComponent({
        name: 'SystemPlatform',
        components: { BasicDrawer, Icon, useDrawer },
        props: {
            menuList: {
                type: Array,
                default: () => [],
            },
        },
        setup(props) {
            const [register, { openDrawer }] = useDrawer();

            const { prefixCls } = useDesign('header-system-platform-drawer');

            const menuList = unref(props.menuList);

            return {
                register,
                openDrawer,
                prefixCls,
                menuList,
            };
        },
    });
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-header-system-platForm-drawer';

    .@{prefix-cls} {
    }
    .icon {
        height: 16px;
        padding: 0 8px;
    }

    .platform-drawer {
    }

    .system-platform-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .system-platform-item {
        width: 180px;
        height: 70px;
        border-radius: 8px;
        margin-bottom: 20px;
        overflow: hidden;

        cursor: pointer;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);

        transition: all 0.3s;

        &:hover,
        &:active {
            background: #f1f5ff;
        }

        &-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @icon-size: 40px;
        &-icon {
            width: @icon-size;
            height: @icon-size;
            margin-right: 10px;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
    [data-theme='dark'] {
        .system-platform-item {
            background: rgba(0, 0, 0, 0.8);
            &:hover,
            &:active {
                background: #323232;
            }
        }
    }
</style>
