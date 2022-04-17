<template>
    <ConfigProvider :locale="getAntdLocale">
        <AppProvider>
            <RouterView />
        </AppProvider>
    </ConfigProvider>
</template>

<script lang="ts" setup>
    import { ConfigProvider } from 'ant-design-vue';
    import { AppProvider } from '/@/components/Application';
    import { useTitle } from '/@/hooks/web/useTitle';
    import { useLocale } from '/@/locales/useLocale';

    // support Multi-language
    const { getAntdLocale } = useLocale();

    // Listening to page changes and dynamically changing site titles
    useTitle();
</script>
<style lang="less">
    .ant-select-dropdown,
    .ant-dropdown-menu {
        padding: 4px 5px !important;
    }
    .ant-select-dropdown {
        padding: 0 5px;
    }
    .ant-dropdown-menu-item,
    .ant-select-item {
        border-radius: 5px;
    }
</style>
