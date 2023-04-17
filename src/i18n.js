import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Ru from '@/bvLocales/ru.json';
import En from '@/bvLocales/en.json';
import Kz from '@/bvLocales/kz.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'Ru',
    fallbackLocale: 'Ru',
    messages: {Ru, En, Kz},
});
export const tbv = (key) => {
    return i18n.t(key)
}
export const i18nPlugin = {
    install(instance) {
        instance.prototype.$tbv= function (key) {
           return tbv(key)
        }
    }
}
