<template>
  <v-app-bar app>
    <v-toolbar-title>电子鼻实验系统</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/">主页</v-btn>
    <v-btn to="/device/list">板子列表</v-btn>
    <v-btn to="/label/list">标签管理</v-btn>
    <v-btn to="/profile">配置管理</v-btn>
    <v-btn to="/model/list">模型管理</v-btn>
<!--    <v-btn to="/account/login">登录</v-btn>-->
<!--    <v-btn to="/account/register">注册</v-btn>-->
    <v-btn to="/account">系统管理</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopBar',
});
</script>

<style scoped>

</style>
