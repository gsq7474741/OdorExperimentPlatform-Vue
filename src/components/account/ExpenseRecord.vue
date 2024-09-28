<template>
  <v-container>
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
  name: 'ExpenseRecord',
  props: {
    accountData: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
