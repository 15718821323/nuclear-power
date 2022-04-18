<template>
    <!-- <LoginFormTitle v-show="getShow" class="enter-x" /> -->
    <div class="type-list enter-x" v-show="unref(getLoginState) !== LoginStateEnum.QR_CODE">
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
                    <span class="verification-container" @click="setVerification">
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
                :disabled="loginStyle.disabled"
                :style="loginStyle.style"
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
    import { log } from 'console';
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
    let verification_code = ref('');
    let verification = ref([]);

    const loginStyle = computed(() => {
        let style = reactive({
            disabled: true,
            style: {
                background: '#004ea2',
                borderColor: '#004ea2',
                color: '#fefefe',
            },
        });
        if (unref(formData.account) && unref(formData.password) && unref(formData.verification)) {
            style.style = undefined;
            style.disabled = false;
        }
        return style;
    });

    const { validForm } = useFormValid(formRef);

    //onKeyStroke('Enter', handleLogin);

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

    setVerification();
    // 四位数验证码，有两位数字和两位大写字母组成，不包含特殊字符
    function setVerification() {
        let arr = [];
        verification_code = '';
        for (let i = 0; i < 2; i++) {
            arr.push(Math.floor(Math.random() * 10));
        }
        for (let i = 0; i < 2; i++) {
            arr.push(String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65));
        }
        // 打乱顺序
        for (let i = 0; i < arr.length; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            const temp = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = temp;
        }
        verification_code = arr.join('');
        verification.value = [...arr];
    }
    async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        if (data.verification.toUpperCase() != verification_code) {
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
        width: 100%;
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
