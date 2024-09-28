<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <div class="text-center">
              <v-img class="text-center" src="https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/ResponseCode/404%20NotFound.png?raw=true" />
              <h1 class="display-2 font-weight-bold mb-3">404</h1>
              <h2 class="headline font-weight-normal">Page not found</h2>
              <p class="lead font-weight-normal">Sorry, the page you are looking for is not available.</p>
              <v-btn class="mt-4" color="white" @click="goHome">Go to Home Page</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.v-application--is-ltr .v-row {
  height: 100vh;
}
</style>
