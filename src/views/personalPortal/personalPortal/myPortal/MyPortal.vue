<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 我的门户
 * @Date: 2022-04-02 14:28:54
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-02 14:31:12
 * @FilePath: /nuclear-power/src/views/personalPortal/personalPortal/myPortal/MyPortal.vue
-->
<template>
    <PageWrapper> 我的门户 </PageWrapper>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { Card } from 'ant-design-vue';
    import { PageWrapper } from '/@/components/Page';

    const loading = ref(true);

    setTimeout(() => {
        loading.value = false;
    }, 1500);
</script>
