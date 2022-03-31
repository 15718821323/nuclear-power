<template>
  <!-- <LoginFormTitle v-show="getShow" class="enter-x" /> -->
  <div class="type-list">
    <span class="type-list-item" @click="setLoginState(LoginStateEnum.LOGIN)" :class="{'active': unref(getLoginState) === LoginStateEnum.LOGIN}">
      {{ t('sys.login.passwordSignInFormTitle') }}
    </span>
    <span class="type-list-item" @click="setLoginState(LoginStateEnum.MOBILE)" :class="{'active': unref(getLoginState) === LoginStateEnum.MOBILE}">
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
          <UserOutlined/>
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

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
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
          <Checkbox v-model:checked="rememberMe" size="small" :style="{color: '#CBCBCB'}">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>
  </Form>
  <!-- <div class="flex justify-between enter-x py-8" :class="`${prefixCls}-sign-in-way`">
    {{ t('sys.login.otherSignIn') }}
    <span class="dashed-span">
      <WechatFilled class="dashed-span-icon"/>
      <span>{{ t('sys.login.weChatSignInFormTitle') }}</span>
    </span>
    <span class="dashed-span">
      <DingdingOutlined class="dashed-span-icon"/>
      <span>{{ t('sys.login.dingDingSignInFormTitle') }}</span>
    </span>
  </div> -->
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    WechatFilled,
    DingdingOutlined,
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
  const { notification, createErrorModal } = useMessage();
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
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
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
  .type-list{
    padding: 15px 0;
    &-item{
      min-width: 90px;
      padding: 10px 0;
      color: #CDCDCD;
      cursor: pointer;
      transition: .2s;
      position: relative;

      &:not(:last-of-type){
        margin-right: 30px;
      }

      &.active{
        color: white;

        &::after{
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
