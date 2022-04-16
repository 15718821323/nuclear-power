<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 快捷菜单
 * @Date: 2022-04-08 22:55:41
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-15 23:09:14
 * @FilePath: /nuclear-power/src/components/ShortcutMenu/src/ShortcutMenu.vue
-->
<template>
    <div class="shortcut-menu">
        <SimpleCard :onMore="handlerMore" title="快捷菜单" icon="ant-design:thunderbolt-filled">
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
        </SimpleCard>
    </div>
</template>

<script lang="ts" setup>
    import { SimpleCard } from '/@/components/SimpleCard';

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
        &-body {
            width: 100%;
            display: flex;
            justify-content: space-around;

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
                    width: 54px;
                    height: auto;
                    margin-bottom: 8px;
                }
                &-title {
                    white-space: nowrap;
                    font-size: 14px;
                    color: #888;
                    transition: all 0.3s;
                    text-align: center;
                }
            }
        }
    }
    [data-theme='dark'] {
        .shortcut-menu-body .menu-item:hover .menu-item-title {
            color: #e4e4e4;
        }
    }
</style>
