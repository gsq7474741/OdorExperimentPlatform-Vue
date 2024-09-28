<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">注册</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="email" type="email"></v-text-field>
              <v-text-field label="Password" v-model="password" type="password"></v-text-field>
              <v-btn @click="register">注册</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      // 处理注册逻辑
      console.log('注册', this.email, this.password);
    },
  },
});
</script>
