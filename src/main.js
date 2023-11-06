import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import App from './App.vue'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Rss from "@/utils/Rss";
import DateUtil from "@/utils/DateUtil";
import router from "@/router";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

Rss.cronInterval();


app.config.globalProperties.$dateUtils = DateUtil;
app.use(ElementPlus)
app.use(router) //注册路由
app.mount('#app')
