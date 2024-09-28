<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-3">
          <v-card-title class="headline">用户信息</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item
                class="mb-3"
                :title="'用户名'"
                :subtitle="accountData.user.name"
              ></v-list-item>
              <v-list-item
                class="mb-3"
                :title="'Email'"
                :subtitle="accountData.user.email"
              ></v-list-item>
              <v-list-item
                class="mb-3"
                :title="'电话'"
                :subtitle="accountData.user.phone"
              ></v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changePassword">修改密码</v-btn>
            <v-btn color="primary" @click="changeEmail">修改邮箱</v-btn>
            <v-btn color="primary" @click="changePhone">修改电话</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-3">
          <v-card-title class="headline">余额管理</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item
                class="mb-3"
                :title="'剩余积分'"
                :subtitle="accountData.balance"
              ></v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="recharge">充值</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-3">
          <v-card-title class="headline">消费记录</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="accountData.headers"
              :items="accountData.records"
              class="elevation-1"
            >
              <template v-slot:item.date="{ item }">
                <td>{{ item.date }}</td>
              </template>
              <template v-slot:item.amount="{ item }">
                <td>{{ item.amount }}</td>
              </template>
              <template v-slot:item.description="{ item }">
                <td>{{ item.description }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'UserInfo',
  props: {
    accountData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePassword() {
      // 处理修改密码逻辑
      console.log('修改密码');
    },
    changeEmail() {
      // 处理修改邮箱逻辑
      console.log('修改邮箱');
    },
    changePhone() {
      // 处理修改电话逻辑
      console.log('修改电话');
    },
    recharge() {
      // 处理充值逻辑
      console.log('充值');
    },
  },
});
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
