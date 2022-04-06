<template>
    <div class="progress-panel-item">
        <Dropdown :trigger="['click']" :dropMenuList="item.dropdown" @menuEvent="handleClick">
            <MoreOutlined />
        </Dropdown>
        <Icon :icon="item.icon" v-if="item.icon" :size="30" color="white" />
        <span class="title"> {{ item.title }} </span>
        <span class="bottom"> {{ labelCpt }} </span>
        <div class="progress-bg" :style="{ height: item.percent + '%' }"></div>
        <span class="label">{{ item.percent }}%</span>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { Dropdown } from '/@/components/Dropdown';
    import { MoreOutlined } from '@ant-design/icons-vue';
    import { Icon } from '/@/components/Icon';

    export default defineComponent({
        components: { Icon },
    });
</script>
<script lang="ts" setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        item: {
            type: Object,
            default: undefined,
        },
    });

    const labelCpt = computed(() => {
        const { item } = props;
        if (item.label == undefined || item.label == null) {
            return '';
        }
        return item.label.length >= 2 ? item.label : '0' + item.label;
    });

    function handleClick(a) {
        console.log(a);
    }
</script>
<style lang="less" scoped>
    .progress-panel-item {
        &:hover {
            .label {
                opacity: 1;
            }
        }
    }
    :deep(.ant-dropdown-trigger) {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        cursor: pointer;
        color: white;
        font-size: 20px;
    }
    .anticon {
        position: relative;
        z-index: 2;
        margin-left: 5px;
    }
    .title {
        color: white;
        font-size: 16px;
        display: block;
        position: relative;
        z-index: 2;
    }
    .bottom {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        color: white;
        text-align: center;
        z-index: 2;
    }

    .progress-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(180deg, #0052a9, #004ea2 100%);
        z-index: 1;

        display: flex;
        justify-content: center;
    }
    .label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
        opacity: 0;
        color: #1c69ff;
        font-size: 14px;
        transition: all 0.2s;
        z-index: 1;
    }
</style>
