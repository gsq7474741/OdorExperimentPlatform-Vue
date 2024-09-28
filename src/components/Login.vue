<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">登录</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="email" type="email"></v-text-field>
              <v-text-field label="Password" v-model="password" type="password"></v-text-field>
              <v-btn @click="login">登录</v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-btn @click="loginWithGoogle" class="mb-2">使用 Google 登录</v-btn>
            <v-btn @click="loginWithWeChat" class="mb-2">使用 微信 登录</v-btn>
            <v-btn @click="loginWithGitHub">使用 GitHub 登录</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // 处理登录逻辑
      console.log('登录', this.email, this.password);
    },
    loginWithGoogle() {
      // 处理 Google 登录逻辑
      console.log('使用 Google 登录');
    },
    loginWithWeChat() {
      // 处理 微信 登录逻辑
      console.log('使用 微信 登录');
    },
    loginWithGitHub() {
      // 处理 GitHub 登录逻辑
      console.log('使用 GitHub 登录');
    },
  },
});
</script>
