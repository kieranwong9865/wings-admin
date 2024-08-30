import type { I18n, I18nOptions } from 'vue-i18n';
import type { App } from 'vue';
import type { I18nT } from './index.d';
import { createI18n } from 'vue-i18n';
import { messages, languages } from './messages';
import { Settings } from '@/constants/settings';
import { getStorage } from '@/utils/storage';
import { pluginAddRegister } from '@/utils/auto';
import { StorageEnum } from '@/constants/enums';

const language: any = getStorage(StorageEnum.LANGUAGE) || Settings.Language;
document
  .getElementsByTagName('html')[0]
  .setAttribute('lang', language as string);

const i18n: I18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: Settings.Language,
  globalInjection: true,
  useScope: 'global',
  messages,
} as I18nOptions);

const useI18n = (app: App<Element>): void => {
  app.use(i18n);
};

const { t } = i18n.global;
const _t: I18nT = t;

export { messages, languages, i18n, useI18n, _t };

export default pluginAddRegister(i18n);
