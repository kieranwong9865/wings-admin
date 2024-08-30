import type { IObject } from '@/types/global.d';
import type { ResponseData } from '@/utils/request/index.d';
import type { LoginAccountData, SignupData } from '@/apis/system/user.d';
import { defineStore } from 'pinia';
import { ElNotification } from 'element-plus';
import { Settings } from '@/constants/settings';
import { useRouteStore } from './use-route-store';
import { getStorage, setStorage } from '@/utils/storage';
import { getLoginStorageType } from '@/utils/common';
import { StorageEnum, RouteEnum } from '@/constants/enums';
import { router } from '@/plugins/vue-router';
import { _t } from '@/plugins/vue-i18n';
import {
  loginByAccount as _loginByAccount,
  getUserProfile as _getUserProfile,
  signup as _signup,
} from '@/apis/system/user';
import { getUserRoles as _getUserRoles } from '@/apis/system/user';

/**
 * @name useUserStore
 * @description 导出用户状态钩子
 * @returns stayLogin 保持登录状态
 * @returns token 唯一凭证
 * @returns userProfile 用户信息
 * @returns userRoles 用户角色
 * @returns isLogin 是否登录状态，用此字段判断是否登录
 * @returns setStayLogin 设置保持登录
 * @returns setUserProfile 设置用户信息
 * @returns getUserProfile 获取用户信息
 * @returns getUserRoles 获取用户权限
 * @returns loginApiHandle 登录后回调，用于处理权限等
 * @returns loginByAccount 账号密码登录
 * @returns loginByMobile 手机号登录
 * @returns signup 注册
 * @returns switchRoles 切换角色
 * @returns logout 退出登录
 */
export const useUserStore = defineStore('user', () => {
  const stayLogin = ref<boolean>(
    getStorage(StorageEnum.STAY_LOGIN, { type: 'local' }) || false
  );

  const token = ref<string | null>(
    getStorage(StorageEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || ''
  );

  const userProfile = ref<IObject>(
    getStorage(StorageEnum.USER_INFO, {
      type: getLoginStorageType(),
    }) || {}
  );

  const userRoles = ref<Array<string>>(
    getStorage(StorageEnum.USER_ROLES, {
      type: getLoginStorageType(),
    }) || []
  );

  const isLogin = computed(() => (token.value ? true : false));

  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state;
    setStorage(StorageEnum.STAY_LOGIN, state, {
      type: 'local',
    });
  };

  const setToken = (_token: string): void => {
    token.value = _token;
    setStorage(StorageEnum.TOKEN, _token, { type: getLoginStorageType() });
  };

  const setUserProfile = (data: IObject): void => {
    userProfile.value = data;
    setStorage(StorageEnum.USER_INFO, data, {
      type: getLoginStorageType(),
    });
  };

  const setUserRoles = (data: Array<string>): void => {
    userRoles.value = data;
    setStorage(StorageEnum.USER_ROLES, data, {
      type: getLoginStorageType(),
    });
  };

  const getUserProfile = async (): Promise<IObject> => {
    return new Promise(async (resolve) => {
      const { code, data } = await _getUserProfile();
      if (code === 0) {
        setUserProfile(data);
        resolve(data);
      } else {
        resolve({});
      }
    });
  };

  const getUserRoles = async (): Promise<IObject> => {
    return new Promise(async (resolve) => {
      const { code, data } = await _getUserRoles();
      if (code === 0) {
        setUserRoles(data);
        resolve(data);
      } else {
        resolve({});
      }
    });
  };

  const loginApiHandle = async (): Promise<void> => {
    await getUserProfile();
    await getUserRoles();
    const routeStore = useRouteStore();
    await routeStore.getAsyncRoutes();
    ElNotification({
      title: _t('app.authentication.loginSuccess'),
      type: 'success',
    });
    router.replace({
      path: Settings.AdminFirstRoute,
    });
  };

  const loginByAccount = async <T>(data: LoginAccountData): Promise<void> => {
    const res: ResponseData<T> = await _loginByAccount(data);
    if (res.code === 0) {
      await setStayLogin(data.remember);
      await setToken(res.data as string);
      await loginApiHandle();
    }
  };

  const loginByMobile = (): void => {};

  const constloginByEmail = (): void => {};

  const signup = async <T>(data: SignupData): Promise<void> => {
    const res: ResponseData<T> = await _signup(data);
  };

  const switchRoles = (): void => {};

  const logout = (): void => {
    setToken('');
    setUserProfile({});
    setUserRoles([]);
    ElNotification({
      title: _t('app.authentication.logoutSuccess'),
      type: 'success',
    });
    router.replace({
      path: RouteEnum.ROUTE_SIGNIN,
    });
  };

  return {
    stayLogin,
    token,
    userProfile,
    userRoles,
    isLogin,
    setStayLogin,
    setUserProfile,
    getUserProfile,
    getUserRoles,
    loginApiHandle,
    loginByAccount,
    loginByMobile,
    constloginByEmail,
    signup,
    switchRoles,
    logout,
  };
});
