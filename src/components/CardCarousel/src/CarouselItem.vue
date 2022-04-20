<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 
 * @Date: 2022-04-20 09:59:33
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-20 21:01:42
 * @FilePath: /nuclear-power/src/components/CardCarousel/src/CarouselItem.vue
-->
<template>
    <div class="card-group">
        <div
            class="card-item"
            v-for="(item, index) in dataList"
            :key="index"
            :style="{ width: itemWidth }"
        >
            <div class="card-item-inner">
                <div class="card-item-header">
                    <div class="card-item-header-title">
                        <div class="title">{{ item.title }}</div>
                        <div class="more" @click="handlerDetail(item)"> 详情 <MoreOutlined /> </div>
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
                            <span class="title"> 执行人 · {{ item.performer.length }}人 </span>
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
</template>

<script lang="ts" setup>
    import { defineComponent, computed, ref, unref, onMounted } from 'vue';
    import { MoreOutlined } from '@ant-design/icons-vue';
    import { Progress } from 'ant-design-vue';
    import { Button } from '/@/components/Button';

    const props = defineProps({
        dataList: {
            type: Array,
            default: () => [],
        },
        itemWidth: {
            type: [Number, String],
            default: '32%',
        },
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
</script>
