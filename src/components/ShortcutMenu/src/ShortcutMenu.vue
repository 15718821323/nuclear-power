<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 快捷菜单
 * @Date: 2022-04-08 22:55:41
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-09 21:22:35
 * @FilePath: /nuclear-power/src/components/ShortcutMenu/src/ShortcutMenu.vue
-->
<template>
    <div class="shortcut-menu">
        <div class="shortcut-menu-container">
            <div class="shortcut-menu-header">
                <div class="shortcut-menu-header-title"> <ThunderboltFilled /> 快捷菜单 </div>
                <div class="shortcut-menu-header-more" @click="handlerMore">
                    更多 <MoreOutlined />
                </div>
            </div>
            <div class="shortcut-menu-body">
                <div
                    class="menu-item"
                    v-for="(menu, key) in menuList"
                    :key="key"
                    @click="
                        () => {
                            menu.onClick && menu.onClick();
                        }
                    "
                >
                    <img class="menu-item-icon" :src="menu.img" alt="" />
                    <span class="menu-item-title"> {{ menu.title }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ThunderboltFilled, MoreOutlined } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref } from 'vue';

    const props = defineProps({
        menuList: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(['onMore']);
    function handlerMore() {
        emit('onMore');
    }
</script>

<style lang="less" scoped>
    .shortcut-menu {
        border-radius: 12px;
        backdrop-filter: blur(4px);
        background: white;
        padding: 15px;
        &-container {
            position: relative;
            width: 100%;
        }
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-title {
                font-size: 20px;
                font-family: PangMenZhengDao, PangMenZhengDao-Regular;
                font-weight: 400;
                color: #1a1a1a;
                line-height: 1;
                letter-spacing: 0.1px;
            }
            &-more {
                font-size: 14px;
                color: #999;
                line-height: 1;
                transition: all 0.2s;
                cursor: pointer;
                &:hover,
                &:focus {
                    color: @primary-color;
                }
            }
        }
        &-body {
            display: flex;
            justify-content: space-around;
            padding-top: 15px;

            .menu-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 4px 6px 10px;
                transition: all 0.3s;
                cursor: pointer;
                border-radius: 10px;

                &:hover,
                &:active {
                    background: rgba(128, 128, 128, 0.06);
                    .menu-item-title {
                        color: #333;
                    }
                }
                &-icon {
                    display: block;
                    width: 48px;
                    height: auto;
                    margin-bottom: 8px;
                }
                &-title {
                    white-space: nowrap;
                    font-size: 12px;
                    color: #888;
                    transition: all 0.3s;
                    text-align: center;
                }
            }
        }
    }
</style>
