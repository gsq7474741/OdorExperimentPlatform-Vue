<template>
  <v-app>
    <TopBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1>欢迎来到电子鼻实验管理系统</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TopBar from "@/components/TopBar.vue";

export default defineComponent({
  name: 'Home',
  components: {TopBar},
  setup() {
    const drawer = ref(false);
    return { drawer };
  },
});
</script>
