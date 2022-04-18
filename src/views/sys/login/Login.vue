<!--
 * @Author: hebing
 * @Interface: 
 * @Description: 
 * @Date: 2022-04-01 11:40:25
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-18 21:29:33
 * @FilePath: /nuclear-power/src/views/sys/login/Login.vue
-->
<template>
    <div :class="prefixCls">
        <!-- <AppLocalePicker
            class="absolute text-white top-4 right-4 enter-x"
            :showText="false"
            v-if="!sessionTimeout && showLocale"
            :style="{ color: 'white' }"
        /> -->
        <!-- 演示登录卡大小切换 -->
        <span class="absolute text-white top-4 right-14 enter-x">
            切换登录卡大小：<Switch v-model:checked="isLarge" />
        </span>

        <div class="logo">
            <!-- <AppLogo class="-enter-x" /> -->
            <div class="logo-container -enter-x">
                <img src="/@/assets/images/logo_long.png" alt="" srcset="" />
            </div>
            <span class="absolute bottom-8 left-30 -enter-x" :style="{ color: '#6184FF' }"
                >*{{ t('sys.login.unitName') }}</span
            >
        </div>
        <div :class="[`${prefixCls}-container`, { large: isLarge }]" class="enter-x">
            <div :class="`${prefixCls}-form`">
                <!-- 扫码登录 -->
                <div class="qr-change">
                    <span
                        class="qr-change-icon"
                        v-if="unref(getLoginState) !== LoginStateEnum.QR_CODE"
                        @click="setLoginState(LoginStateEnum.QR_CODE)"
                    >
                        <!-- <QrcodeOutlined /> -->
                        <img src="/@/assets/images/login/qr1.png" alt="" />
                    </span>
                    <span
                        class="qr-change-icon"
                        v-else
                        @click="setLoginState(LoginStateEnum.LOGIN)"
                    >
                        <!-- <DesktopOutlined /> -->
                        <img src="/@/assets/images/login/qr2.png" alt="" />
                    </span>
                </div>
                <div :class="`${prefixCls}-form-container`">
                    <!-- <img
                        :class="`${prefixCls}-form-title`"
                        src="../../../assets/images/login/title.png"
                    /> -->
                    <span :class="`${prefixCls}-form-title`">中核基础技术平台</span>
                    <LoginForm />
                    <ForgetPasswordForm />
                    <RegisterForm />
                    <MobileForm />
                    <QrCodeForm />
                    <div
                        :class="`${prefixCls}-sign-in-way`"
                        v-show="unref(getLoginState) !== LoginStateEnum.QR_CODE"
                    >
                        {{ t('sys.login.otherSignIn') }}
                        <span class="dashed-span">
                            <span class="dashed-span-icon">
                                <WechatFilled />
                            </span>
                            <span>{{ t('sys.login.weChatSignInFormTitle') }}</span>
                        </span>
                        <span class="dashed-span">
                            <span class="dashed-span-icon">
                                <DingdingOutlined />
                            </span>
                            <span>{{ t('sys.login.dingDingSignInFormTitle') }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, unref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Switch } from 'ant-design-vue';
    import {
        WechatFilled,
        DingdingOutlined,
        DesktopOutlined,
        QrcodeOutlined,
    } from '@ant-design/icons-vue';
    import { AppLogo } from '/@/components/Application';
    import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
    import LoginForm from './LoginForm.vue';
    import ForgetPasswordForm from './ForgetPasswordForm.vue';
    import RegisterForm from './RegisterForm.vue';
    import MobileForm from './MobileForm.vue';
    import QrCodeForm from './QrCodeForm.vue';
    import { useGlobSetting } from '/@/hooks/setting';
    import { useI18n } from '/@/hooks/web/useI18n';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useLocaleStore } from '/@/store/modules/locale';
    import { log } from 'console';
    import { LoginStateEnum, useLoginState } from './useLogin';
    const { setLoginState, getLoginState } = useLoginState();

    defineProps({
        sessionTimeout: {
            type: Boolean,
        },
    });

    const globSetting = useGlobSetting();
    const { prefixCls } = useDesign('login');
    const { t } = useI18n();
    const localeStore = useLocaleStore();
    const showLocale = localeStore.getShowPicker;
    const title = computed(() => globSetting?.title ?? '');

    // 控制登录卡片大小
    const isLarge = ref<boolean>(false);
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-login';
    @logo-prefix-cls: ~'@{namespace}-app-logo';
    @countdown-prefix-cls: ~'@{namespace}-countdown-input';
    @dark-bg: #293146;
    @sign-prefix-cls: ~'@{prefix-cls}-sign-in-way';

    @color-gray: #cbcbcb;
    @color-blue: #40a9ff;

    .@{prefix-cls} {
        min-height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        // align-items: center;

        background-color: #2e5dd3;
        background-image: url(../../../assets/images/login/bg.jpg);
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;

        @circle-1-size: 300px;
        @circle-2-size: 400px;
        @circle-color: #0047ff;
        &::before,
        &::after{
            content: ' ';
            position: absolute;
            border-radius: 50%;
            opacity: .5;
        }
        &::before{
            border: 50px solid @circle-color;
            width: @circle-1-size;
            height: @circle-1-size;
            left: 0;
            top: 0;
            transform: translate(-65%,-65%);
        }
        &::after{
            border: 70px solid @circle-color;
            width: @circle-2-size;
            height: @circle-2-size;
            right: 0;
            bottom: 0;
            transform: translate(60%,60%);
        }

        .logo{
            width: 60%;
            height: 100%;
            @media (max-width: @screen-md) {
                    display: none;
            }

            .logo-container{
                width: 260px;
                position: absolute;
                top: 50px;
                left: 120px;
            }
        }
        .@{prefix-cls}-container {
            width: 40%;
            min-width: 400px;
            max-width: 600px;
            display: flex;
            // justify-content: center;
            align-items: center;

            &.large{
                .@{prefix-cls}-form{
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    .qr-change{
                        top: 0;
                        right: 0;
                        border-top-right-radius: 0;
                    }
                }
            }
            .@{prefix-cls}-form{
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0,16,56,0.75);
                backdrop-filter: blur(23px);
                border-radius: 14px;
                overflow: hidden;
                transition: all .3s;
                position: relative;
                &-container {
                    width: 480px;
                    padding: 60px;
                    min-height: 590px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    :deep(.ant-form){
                        min-height: 313px;
                        width: 100%;
                    }
                }
                &-title{
                    width: 100%;
                    height: auto;
                    display: block;
                    margin-bottom: 30px;
                    font-size: 38px;
                    font-family: ZhenyanGB, ZhenyanGB-Regular;
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    letter-spacing: 2px;
                }
                @icon-qr-size: 76px;
                @change-duration: .2s;
                .qr-change{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: @icon-qr-size;
                    height: @icon-qr-size;
                    cursor: pointer;
                    transition: all @change-duration;
                    overflow: hidden;
                    border-top-right-radius: 12px;
                    &:hover,
                    &:active{
                        .qr-change-icon{
                            // background: rgba(0,16,56,0.9);
                            // top: 35%;
                            // left: 65%;
                            img{
                                opacity: 1;
                            //     bottom: -7%;
                            }
                        }
                    }
                    .qr-change-icon{
                        // width: 200%;
                        // height: 100%;
                        // display: block;
                        // position: absolute;
                        // top: 15%;
                        // left: 85%;
                        // font-size: 60px;
                        // color: #2e5dd3;
                        // background: rgba(0,16,56,0.75);
                        // transform: translate(-50%, -50%) rotate(45deg);
                        overflow: hidden;
                        transition: all @change-duration;

                        // .anticon{
                        //     position: absolute;
                        //     bottom: -35%;
                        //     left: 50%;
                        //     transform: translateX(-50%) rotate(-45deg);
                        //     opacity: .5;
                        //     transition: all @change-duration;
                        // }
                        img{
                            opacity: .5;
                        }
                    }
                }
            }

            :deep(.ant-input),
            :deep(.ant-input-password){
                background: transparent !important;
                color: white;
            }

            :deep(.ant-input-prefix){
                color: @color-gray;
            }
            :deep(.ant-input-clear-icon),
            :deep(.ant-input-password-icon){
                color: rgba(87, 91, 155, .3);
                font-size: 14px;
                transition: .2s;
                &:hover{
                    color: @color-blue;
                }
            }
            :deep(.ant-input-affix-wrapper){
                background-color: rgba(0, 11, 38, 0.4) !important;
                border-color: transparent;
                border-radius: 8px;
                &:hover{
                    border-color: @color-blue;
                }
            }
            :deep(.ant-input-group){
                & > .ant-input-affix-wrapper:first-child{
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
                .ant-input-group-addon{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background: rgba(249,249,249,0.08);
                    border-color: transparent;
                    color: #0548FF;
                    font-size: 16px;
                    // padding-left: 0;
                    button {
                        margin-left: -12px;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                }
            }
            :deep(.ant-checkbox-inner){
                background: transparent;
            }
        }

        .@{logo-prefix-cls} {
            position: absolute;
            top: 12px;
            // height: 30px;

            &__title {
                font-size: 16px;
                color: #fff;
            }

            img {
                width: 264px;
            }
        }

        .container {
            .@{logo-prefix-cls} {
                display: flex;
                width: 60%;
                height: 80px;

                &__title {
                    font-size: 24px;
                    color: #fff;
                }

                img {
                    width: 48px;
                }
            }
        }

        &-sign-in-way {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .anticon {
                font-size: 22px;
                color: #888;
                cursor: pointer;

                &:hover {
                    color: @primary-color;
                }
            }
        }

        .@{countdown-prefix-cls} input {
            min-width: unset;
        }

        .ant-divider-inner-text {
            font-size: 12px;
            color: @text-color-secondary;
        }
    }
    .@{sign-prefix-cls}{
        color: @color-gray;
    }
    :deep(.app-iconify){
        color: white;
    }
    .dashed-span{
        display: flex;
        align-items: center;
        border: 1px dashed @color-gray;
        border-radius: 3px;
        color: @color-gray;
        overflow: hidden;
        padding-right: 10px;
        cursor: pointer;
        transition: .2s;
        font-size: 12px;

        .dashed-span-icon{
            background: rgba(0, 0, 0, .2);
            transition: .2s;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 3px 5px;
            .anticon{
                font-size: 16px;
            }
        }

        &:hover{
            border-color: white;
            color: white;
            .dashed-span-icon{
                color: white;
                background: rgba(255, 255, 255, .25);
            }
        }
    }
    :deep(.ant-btn) {
        border-radius: 8px;
        height: 50px;
    }

    :deep(.verification-container){
        display: block;
        min-width: 41px;
        height: 100%;
        .verification-item{
            &:not(:last-of-type){
                margin-right: 10px;
            }
        }
    }
</style>
