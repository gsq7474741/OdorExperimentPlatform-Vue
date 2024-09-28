<template>
  <v-app>
    <TopBar/>

    <v-navigation-drawer
      image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      theme="dark"
      permanent
    >
      <v-list nav>
        <v-list-item @click="goTo('HeaterProfile')" prepend-icon="mdi-temperature-celsius" title="温度调制配置" value="温度调制配置"></v-list-item>
        <v-list-item @click="goTo('DutyCycleProfile')" prepend-icon="mdi-timer-cog-outline" title="使能周期配置" value="使能周期配置"></v-list-item>
        <v-list-item @click="goTo('GeneralProfile')" prepend-icon="mdi-wrench-outline" title="通用配置" value="通用配置"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <component :is="currentComponent" :account-data="accountData"></component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from "@/components/TopBar.vue";
import HeaterProfile from "@/components/profile/HeaterProfile.vue";
import DutyCycleProfile from "@/components/profile/DutyCycleProfile.vue";
import GeneralProfile from "@/components/profile/GeneralProfile.vue";

export default defineComponent({
  name: 'Profile',
  components: {
    HeaterProfile,
    DutyCycleProfile,
    GeneralProfile,
    TopBar,
  },
  data() {
    return {
      drawer: true,
      currentComponent: 'HeaterProfile',
      accountData: {
        user: {
          email: 'user@example.com',
          name: '用户名',
          phone: '13300001111',
        },
        balance: 100,
        headers: [
          { key: 'date', title: '日期' },
          { key: 'amount', title: '金额' },
          { key: 'description', title: '描述' }
        ],
        records: [
          { date: '2023-01-01 10:00:00', amount: 50, description: '充值-支付宝' },
          { date: '2023-01-01 10:00:00', amount: 30, description: '充值-微信' },
          { date: '2023-01-02 08:00:00', amount: -10, description: '购买服务器' },
          { date: '2023-01-02 08:45:00', amount: 3, description: '提前停止服务器返还' },
        ],
      },
    };
  },
  methods: {
    goTo(componentName: string) {
      this.currentComponent = componentName;
    },
  },
});
</script>
