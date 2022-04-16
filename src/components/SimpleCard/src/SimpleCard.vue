<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 带标题的普通卡片
 * @Date: 2022-04-15 21:28:27
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-17 00:34:46
 * @FilePath: /nuclear-power/src/components/SimpleCard/src/SimpleCard.vue
-->
<template>
    <div class="simple-card">
        <div class="simple-card-container">
            <div class="simple-card-header">
                <div class="simple-card-header-title">
                    <template v-if="title">
                        <Icon :icon="icon" size="18" />
                        {{ title }}
                    </template>
                    <template v-else>
                        <slot name="title"></slot>
                    </template>
                </div>
                <div class="simple-card-header-more" @click="handlerMore">
                    更多 <MoreOutlined />
                </div>
            </div>
            <div class="simple-card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ThunderboltFilled, MoreOutlined } from '@ant-design/icons-vue';
    import { Icon } from '/@/components/Icon';

    const props = defineProps({
        icon: {
            type: String,
            default: '',
        },
        title: { type: String, default: '' },
        onMore: { type: Function, default: () => {} },
    });

    function handlerMore() {
        props.onMore && props.onMore();
    }
</script>

<style lang="less" scoped>
    @border-radius: 12px;
    .simple-card {
        height: 100%;
        border-radius: @border-radius;
        backdrop-filter: blur(4px);
        background: white;
        padding: 15px;
        overflow: hidden;
        position: relative;
        &-container {
            position: relative;
            width: 100%;
            height: 100%;
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
                font-size: 20px;
                display: flex;
                align-items: center;
                .anticon {
                    margin-right: 5px;
                }
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
            justify-content: center;
            padding-top: 15px;
            height: calc(~'100% - 20px');

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
    [data-theme='dark'] {
        .simple-card {
            // background: rgba(34, 37, 44, 0.8);
            background: transparent;
            z-index: 1;

            @filter: 0;
            &:after {
                content: ' ';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: @border-radius;

                background: rgba(34, 37, 44, 0.8);
                -webkit-filter: blur(@filter);
                -moz-filter: blur(@filter);
                -ms-filter: blur(@filter);
                -o-filter: blur(@filter);
                filter: blur(@filter);
                z-index: -1;
            }
        }
        .simple-card-header-title {
            color: #e4e4e4;
        }
        .simple-card-body .menu-item:hover .menu-item-title {
            color: #e4e4e4;
        }
    }
</style>
