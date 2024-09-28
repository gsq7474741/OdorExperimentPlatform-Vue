/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Import Vue Router
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from "@/components/PageNotFound.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Account from "@/components/Account.vue";
import Profile from "@/components/Profile.vue";

import DeviceList from "@/components/DeviceList.vue";
import DevicePanel from "@/components/DevicePanel.vue";
import LabelList from "@/components/LabelList.vue";
import LabelPanel from "@/components/LabelPanel.vue";


// Define routes
// 生成以下有注释的几个组件，用vuetify + ts实现
// 整个网站是一个电子鼻实验管理系统，DeviceList组件用于显示设备列表，DevicePanel组件用于显示单个设备控制面板，LabelList组件用于显示标签列表，LabelPanel组件用于显示单个标签控制面板，
// 具体的组件功能见注释
const routes = [
  { path: '/404', component: PageNotFound }, // 404页面
  { path: '/', component: Home }, // 欢迎页面

  { path: '/device/list', component: DeviceList }, // 设备列表页面
  { path: '/device/panel/:id', component: DevicePanel },  // 设备控制面板页面

  { path: '/label/list', component: LabelList },  // 标签列表页面
  { path: '/label/panel/:id', component: LabelPanel },  // 标签控制面板页面
  { path: '/profile', component: Profile },  //

  { path: '/account/login', component: Login }, // 登录页面，参考openai的登录界面样式，要接入使用第三方认证，谷歌、微信、github等
  { path: '/account/register', component: Register }, // 注册页面，同登录页面
  { path: '/account', component: Account }, // 个人中心页面，显示用户信息，可以修改密码，查看消费记录，管理余额并充值等

  // { path: '/account/user-info', component: UserInfo, name: 'user-info' },
  // { path: '/account/expense-record', component: ExpenseRecord, name: 'expense-record' },
  // { path: '/account/balance-management', component: BalanceManagement, name: 'balance-management' },

]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

registerPlugins(app)

// Use router
app.use(router)

app.mount('#app')
