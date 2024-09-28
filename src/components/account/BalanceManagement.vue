<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">余额管理</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                class="mb-3"
                lines="three"
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BalanceManagement',
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
