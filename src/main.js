import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import i18n from './i18n'
import {createPinia} from "pinia";
import ToastPlugin from "vue-toast-notification";
import {LoadingPlugin} from 'vue-loading-overlay';

import '@/assets/style/base.css'
import '@/assets/style/icon.css'
import 'vue-loading-overlay/dist/css/index.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import { registerGlobalComponent } from '@/utils/import'

const app = createApp(App)
registerGlobalComponent(app)


// app.use(store)
app.use(createPinia());
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(ToastPlugin)
app.use(LoadingPlugin)
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')

