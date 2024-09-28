<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>CS2 服务器管理系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">主页</v-btn>
      <v-btn to="/server/list">服务器列表</v-btn>
      <v-btn to="/account/login">登录</v-btn>
      <v-btn to="/account/register">注册</v-btn>
      <v-btn to="/account">个人中心</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="mb-5">服务器详情</h2>
            <v-card>
              <v-card-title>{{ server.name }}</v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>ID</v-list-item-title>
                      <v-list-item-subtitle>{{ server.id }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>名称</v-list-item-title>
                      <v-list-item-subtitle>{{ server.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>地区</v-list-item-title>
                      <v-list-item-subtitle>{{ server.region }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>状态</v-list-item-title>
                      <v-list-item-subtitle>{{ server.status }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>配置</v-list-item-title>
                      <v-list-item-subtitle>{{ server.configuration }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ServerDetail',
  setup() {
    const route = useRoute();
    const serverId = route.params.id;
    const server = ref({
      id: '',
      name: '',
      region: '',
      status: '',
      configuration: '',
    });

    onMounted(() => {
      // 模拟从 API 获取服务器详情
      setTimeout(() => {
        server.value = {
          id: serverId as string,
          name: '示例服务器',
          region: 'US',
          status: 'Running',
          configuration: '4 vCPUs, 16 GB RAM, 100 GB SSD',
        };
      }, 1000);
    });

    return { server };
  },
});
</script>
