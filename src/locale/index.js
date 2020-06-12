import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customPtBr from './lang/id-ID'

Vue.use(VueI18n);

// 自动根据浏览器系统语言设置语言
// const navLang = navigator.language;
// const localLang = navLang ? navLang : 'id-ID';
// let lang = localLang==='id-ID' ? localLang : 'id-ID';
let lang="id-ID";
window.sessionStorage.setItem("locale",lang);
Vue.config.lang = lang;

// vue-i18n 6.x+写法
Vue.locale = () => {};
const messages = {
  'zh-CN': customZhCn,
  'id-ID': customPtBr,
  // 'en-US': Object.assign(enUsLocale, customEnUs)
};
const i18n = new VueI18n({
  locale: lang,
  messages
});

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('pt-BR', Object.assign(ptBrLocale, customptBr))
// Vue.locale('en-US', Object.assign(enUsLocale, customEnUs))
