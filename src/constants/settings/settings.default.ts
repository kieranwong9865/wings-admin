import type { SystemSettings } from '@/types/global.d';
import { SettingsValueEnum, LanguageEnum, RouteEnum } from '@/constants/enums';

/**
 * @name SettingsDefault
 * @description 默认设置
 */
export const SettingsDefault: SystemSettings = {
  Layout: SettingsValueEnum.LAYOUT_TOP,
  ThemeColor: '#b90b0b',
  ColorScheme: SettingsValueEnum.COLOR_SCHEME_AUTO,
  TabStyle: SettingsValueEnum.TAB_STYLE_SQUARE,
  MenuStyle: SettingsValueEnum.MENU_STYLE_ROUND,
  Toolbar: {
    Dark: true,
    Language: true,
    Refresh: true,
    Notification: true,
    Fullscreen: true,
    Setting: true,
    Avatar: true,
  },
  Footer: false,
  Tab: true,
  UniqueOpened: true,
  Copyright: SettingsValueEnum.COPYRIGHT_VIEW_BOTTOM,
  Breadcrumb: SettingsValueEnum.BREADCRUMB_VIEW_TOP,
  ElementPlus: {
    size: 'default',
    message: {
      max: 3,
    },
    button: {
      autoInsertSpace: true,
    },
    language: 'el-language',
  },
  Language: LanguageEnum.ZH_CN_ALIAS,
  FirstRoute: RouteEnum.ROUTE_FIRST,
  AdminFirstRoute: RouteEnum.ROUTE_ADMIN_FIRST,
  NetworkTimeout: 30000,
};
