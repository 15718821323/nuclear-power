<template>
    <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
        <span @click="toggle">
            <!-- <FullscreenOutlined v-if="!isFullscreen" />
            <FullscreenExitOutlined v-else /> -->
            <Icon icon="octicon:screen-full" v-if="!isFullscreen" />
            <Icon icon="octicon:screen-normal" v-else />
        </span>
    </Tooltip>
</template>
<script lang="ts">
    import { defineComponent, computed, unref } from 'vue';
    import { Tooltip } from 'ant-design-vue';
    import { useI18n } from '/@/hooks/web/useI18n';
    import { useFullscreen } from '@vueuse/core';
    import Icon from '/@/components/Icon';

    //   import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
    export default defineComponent({
        name: 'FullScreen',
        // components: { FullscreenExitOutlined, FullscreenOutlined, Tooltip },
        components: { Tooltip, Icon },

        setup() {
            const { t } = useI18n();
            const { toggle, isFullscreen } = useFullscreen();

            const getTitle = computed(() => {
                return unref(isFullscreen)
                    ? t('layout.header.tooltipExitFull')
                    : t('layout.header.tooltipEntryFull');
            });

            return {
                getTitle,
                isFullscreen,
                toggle,
            };
        },
    });
</script>
