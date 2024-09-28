<template>
  <v-app>
    <TopBar/>
<!--    <v-navigation-drawer v-model="drawer" app>-->
<!--      <v-list>-->
<!--        <v-list-item @click="goTo('user-info')">-->
<!--          <v-list-item-title>用户信息</v-list-item-title>-->
<!--        </v-list-item>-->
<!--        <v-list-item @click="goTo('expense-record')">-->
<!--          <v-list-item-title>消费记录</v-list-item-title>-->
<!--        </v-list-item>-->
<!--&lt;!&ndash;        <v-list-item @click="goTo('balance-management')">&ndash;&gt;-->
<!--&lt;!&ndash;          <v-list-item-title>余额管理</v-list-item-title>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-list-item>&ndash;&gt;-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
    <v-main>
<!--      <component :is="currentComponent" :account-data="accountData"></component>-->
      <UserInfo :account-data="accountData" />
    </v-main>
  </v-app>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import TopBar from "@/components/TopBar.vue";
import UserInfo from '@/components/account/UserInfo.vue';
import ExpenseRecord from '@/components/account/ExpenseRecord.vue';
// import BalanceManagement from '@/components/account/BalanceManagement.vue';


export default defineComponent({
  name: 'Account',
  components: {
    TopBar,
    UserInfo,
    ExpenseRecord,
    // BalanceManagement
  },

  data() {
    return {
      drawer: true,
      currentComponent: 'UserInfo',
      accountData: {
        user: {
          email: 'user@example.com',
          name: '用户名',
          phone: '13300001111',
        },
        balance: 100,
        headers: [
          {key: 'date', title: '日期'},
          {key: 'amount', title: '金额'},
          {key: 'description', title: '描述'}
        ],
        records: [
          // 示例数据
          {date: '2023-01-01 10:00:00', amount: 50, description: '充值-支付宝'},
          {date: '2023-01-01 10:00:00', amount: 30, description: '充值-微信'},
          {date: '2023-01-02 08:00:00', amount: -10, description: '购买服务器'},
          {date: '2023-01-02 08:45:00', amount: 3, description: '提前停止服务器返还'},
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
