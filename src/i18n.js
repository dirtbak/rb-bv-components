import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import kz from '@/locales/kz.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: localStorage.getItem('bvLocal') || 'ru',
    messages: {ru, en, kz},
});
export const i18nPlugin = {
    install(instance) {
        instance.prototype.$t= function (key) {
           return i18n.t(key)
        }
    }
}
