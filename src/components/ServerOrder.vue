<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>购买服务器</h2>
        <!-- 这里包括服务器配置，时长，支付方式，确认订单等 -->
        <v-form ref="form">
          <!-- 示例配置项 -->
          <v-text-field label="服务器名称" v-model="serverName"></v-text-field>
          <v-text-field label="时长 (小时)" v-model="duration" type="number"></v-text-field>
          <v-select :items="paymentMethods" label="支付方式" v-model="paymentMethod"></v-select>
          <v-btn @click="confirmOrder">确认订单</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServerOrder',
  data() {
    return {
      serverName: '',
      duration: 0,
      paymentMethod: null,
      paymentMethods: ['Credit Card', 'PayPal', 'Alipay'],
    };
  },
  methods: {
    confirmOrder() {
      // 处理订单确认逻辑
      console.log('订单确认', this.serverName, this.duration, this.paymentMethod);
    },
  },
});
</script>
