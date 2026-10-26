// 应用的入口文件：创建 Vue 应用 -> 装上路由 -> 挂载到 index.html 的 #app 上
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')
