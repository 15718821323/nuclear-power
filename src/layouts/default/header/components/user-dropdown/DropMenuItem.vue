<template>
    <MenuItem :key="itemKey">
        <span class="item-container">
            <Icon :icon="icon" />
            <span class="item-name">{{ text }}</span>
            <Icon :icon="'akar-icons:chevron-right'" />
        </span>
    </MenuItem>
</template>
<script lang="ts">
    import { Menu } from 'ant-design-vue';

    import { computed, defineComponent, getCurrentInstance } from 'vue';

    import Icon from '/@/components/Icon/index';
    import { propTypes } from '/@/utils/propTypes';

    export default defineComponent({
        name: 'DropdownMenuItem',
        components: { MenuItem: Menu.Item, Icon },
        props: {
            key: propTypes.string,
            text: propTypes.string,
            icon: propTypes.string,
        },
        setup(props) {
            const instance = getCurrentInstance();
            const itemKey = computed(() => props.key || instance?.vnode?.props?.key);
            return { itemKey };
        },
    });
</script>
