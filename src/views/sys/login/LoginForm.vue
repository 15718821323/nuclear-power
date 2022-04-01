<template>
    <!-- <LoginFormTitle v-show="getShow" class="enter-x" /> -->
    <div class="type-list">
        <span
            class="type-list-item"
            @click="setLoginState(LoginStateEnum.LOGIN)"
            :class="{ active: unref(getLoginState) === LoginStateEnum.LOGIN }"
        >
            {{ t('sys.login.passwordSignInFormTitle') }}
        </span>
        <span
            class="type-list-item"
            @click="setLoginState(LoginStateEnum.MOBILE)"
            :class="{ active: unref(getLoginState) === LoginStateEnum.MOBILE }"
        >
            {{ t('sys.login.mobileSignInFormTitle') }}
        </span>
    </div>
    <Form
        class="p-4 enter-x"
        :model="formData"
        :rules="getFormRules"
        ref="formRef"
        v-show="getShow"
        @keypress.enter="handleLogin"
    >
        <FormItem name="account" class="enter-x">
            <Input
                size="large"
                allowClear
                v-model:value="formData.account"
                :placeholder="t('sys.login.userName')"
                class="fix-auto-fill"
            >
                <template #prefix>
                    <UserOutlined />
                </template>
            </Input>
        </FormItem>
        <FormItem name="password" class="enter-x">
            <InputPassword
                size="large"
                allowClear
                visibilityToggle
                v-model:value="formData.password"
                :placeholder="t('sys.login.password')"
            >
                <template #prefix>
                    <LockOutlined />
                </template>
            </InputPassword>
        </FormItem>
        <FormItem name="verification" class="enter-x">
            <Input
                allowClear
                size="large"
                v-model:value="formData.verification"
                :placeholder="t('sys.login.verification')"
                class="fix-auto-fill"
            >
                <template #prefix>
                    <SecurityScanOutlined />
                </template>
                <template #addonAfter>
                    <span class="verification-container">
                        <span
                            class="verification-item"
                            v-for="(ver, key) in verification"
                            :key="key"
                        >
                            {{ ver }}
                        </span>
                    </span>
                </template>
            </Input>
        </FormItem>

        <FormItem class="enter-x">
            <Button
                class="btn-login"
                type="primary"
                size="large"
                block
                @click="handleLogin"
                :loading="loading"
            >
                {{ t('sys.login.loginButton') }}
            </Button>
            <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
                {{ t('sys.login.registerButton') }}
            </Button> -->
        </FormItem>

        <ARow class="enter-x">
            <ACol :span="12">
                <FormItem>
                    <!-- No logic, you need to deal with it yourself -->
                    <Checkbox
                        v-model:checked="rememberMe"
                        size="small"
                        :style="{ color: '#CBCBCB' }"
                    >
                        {{ t('sys.login.rememberMe') }}
                    </Checkbox>
                </FormItem>
            </ACol>
            <ACol :span="12">
                <FormItem :style="{ 'text-align': 'right' }">
                    <!-- No logic, you need to deal with it yourself -->
                    <Button
                        type="link"
                        size="small"
                        @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
                    >
                        {{ t('sys.login.forgetPassword') }}
                    </Button>
                </FormItem>
            </ACol>
        </ARow>
    </Form>
</template>
<script lang="ts" setup>
    import { reactive, ref, unref, computed } from 'vue';

    import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
    import {
        WechatFilled,
        DingdingOutlined,
        SecurityScanOutlined,
        UserOutlined,
        LockOutlined,
    } from '@ant-design/icons-vue';
    import LoginFormTitle from './LoginFormTitle.vue';

    import { useI18n } from '/@/hooks/web/useI18n';
    import { useMessage } from '/@/hooks/web/useMessage';

    import { useUserStore } from '/@/store/modules/user';
    import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
    import { useDesign } from '/@/hooks/web/useDesign';
    //import { onKeyStroke } from '@vueuse/core';

    const ACol = Col;
    const ARow = Row;
    const FormItem = Form.Item;
    const InputPassword = Input.Password;
    const { t } = useI18n();
    const { notification, createErrorModal, createMessage } = useMessage();
    const { prefixCls } = useDesign('login');
    const userStore = useUserStore();

    const { setLoginState, getLoginState } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);
    const rememberMe = ref(false);

    const formData = reactive({
        account: 'admin',
        password: '123456',
        verification: null,
    });
    const verification = reactive(['3', '5', 't', '2']);

    const { validForm } = useFormValid(formRef);

    //onKeyStroke('Enter', handleLogin);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

    async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        if (data.verification != '35t2') {
            createMessage.error(t('sys.api.errorVerification'));
            return;
        }

        try {
            loading.value = true;
            const userInfo = await userStore.login({
                password: data.password,
                username: data.account,
                mode: 'none', //不要默认的错误提示
            });
            if (userInfo) {
                notification.success({
                    message: t('sys.login.loginSuccessTitle'),
                    description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
                    duration: 3,
                });
            }
        } catch (error) {
            createErrorModal({
                title: t('sys.api.errorTip'),
                content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
                getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
            });
        } finally {
            loading.value = false;
        }
    }
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-login';
    .type-list {
        padding: 15px 0;
        &-item {
            min-width: 90px;
            padding: 10px 0;
            color: #cdcdcd;
            cursor: pointer;
            transition: 0.2s;
            position: relative;

            &:not(:last-of-type) {
                margin-right: 30px;
            }

            &.active {
                color: white;

                &::after {
                    content: ' ';
                    position: absolute;
                    bottom: 3px;
                    left: 25%;
                    width: 50%;
                    height: 2px;
                    background: white;
                }
            }
        }
    }
</style>
