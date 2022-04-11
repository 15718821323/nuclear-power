<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 文件列表
 * @Date: 2022-04-09 20:35:20
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-10 10:51:25
 * @FilePath: /nuclear-power/src/components/FileList/src/FileList.vue
-->
<template>
    <div class="file-list">
        <div class="file-list-container">
            <div class="file-list-header">
                <div class="file-list-header-title"> <FileAddFilled /> 文档资料 </div>
                <div class="file-list-header-more" @click="handlerMore">
                    更多 <MoreOutlined />
                </div>
            </div>
            <div class="file-list-body">
                <div
                    class="file-item"
                    v-for="(file, key) in fileList"
                    :key="key"
                    @click="
                        () => {
                            file.onClick && file.onClick();
                        }
                    "
                >
                    <div class="file-item-icon">
                        <template v-if="imgSrcCpt(file.type)">
                            <img :src="imgSrcCpt(file.type)" alt="" />
                        </template>
                    </div>
                    <div class="file-item-body">
                        <div class="file-item-body-header">
                            <div class="header-title"> {{ file.title }} </div>
                            <div class="header-time"> {{ file.time }} </div>
                        </div>
                        <div class="file-item-body-content"> {{ file.content }} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { FileAddFilled, MoreOutlined } from '@ant-design/icons-vue';
    import { defineComponent, computed, unref } from 'vue';

    const props = defineProps({
        fileList: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(['onMore']);
    function handlerMore() {
        emit('onMore');
    }

    const imgSrcCpt = computed(() => {
        return (type) => {
            let src = null;
            switch (type) {
                case 'excel':
                    src = '/@/assets/images/fileList/excel.png';
                    break;
                case 'word':
                    src = '/@/assets/images/fileList/word.png';
                    break;
                case 'ppt':
                    src = '/@/assets/images/fileList/ppt.png';
                    break;
                case 'image':
                    src = '/@/assets/images/fileList/image.png';
                    break;

                default:
                    break;
            }
            return src;
        };
    });
</script>

<style lang="less" scoped>
    .file-list {
        height: 100%;
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
            // display: flex;
            // justify-content: space-around;
            padding-top: 15px;

            .file-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                transition: all 0.3s;
                cursor: pointer;
                border-radius: 10px;

                &:hover,
                &:active {
                    background: rgba(128, 128, 128, 0.06);
                    .file-item-title {
                        color: #333;
                    }
                }

                @icon-size: 40px;
                &-icon {
                    display: block;
                    width: @icon-size;
                    height: @icon-size;
                    border-radius: 4px;
                    overflow: hidden;
                    background: #f3f3f3;
                }
                &-body {
                    width: calc(~'100% - @{icon-size}');
                    overflow: hidden;
                    padding-left: 8px;

                    &-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-bottom: 3px;
                        @time-width: 80px;
                        .header-title {
                            width: calc(~'100% - @{time-width}');
                            font-size: 16px;
                            font-weight: 500;
                            color: #1a1a1a;
                            line-height: 1.6;

                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .header-time {
                            width: @time-width;
                            font-size: 12px;
                            color: #9e9e9e;
                            text-align: right;
                        }
                    }
                    &-content {
                        width: 100%;
                        font-size: 12px;
                        color: #4c4c4c;
                        line-height: 1.6;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
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
