
// Import vue components
import * as components from '@/components/index';
import {i18nPlugin} from "@/i18n";

// install function executed by Vue.use()
const install = function installRbBvComponents(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
    Vue.use(i18nPlugin)
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index';
