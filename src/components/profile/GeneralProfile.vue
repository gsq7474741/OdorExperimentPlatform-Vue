<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-3">
          <v-card-title class="headline">通用配置 General Profile</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table :items="servers" :headers="headers" :items-per-page-text="'每页条目:'">
              <!--                  <template v-slot:header.stock>-->
              <!--                    <div class="text-end">Stock</div>-->
              <!--                  </template>-->
              <!--                  <v-data-table-->
              <!--                    :headers="playerTableHeaders"-->
              <!--                    :items="onlinePlayers"-->
              <!--                    :search="search"-->
              <!--                  ></v-data-table>-->

              <template v-slot:item.image="{ item }">
                <v-card class="my-2" elevation="2" rounded>
                  <v-img
                    :src="item.image"
                    height="64"
                    cover
                  ></v-img>
                </v-card>
              </template>

              <template v-slot:item.rating="{ item }">
                <v-rating
                  :model-value="item.rating"
                  color="orange-darken-2"
                  density="compact"
                  size="small"
                  readonly
                ></v-rating>
              </template>

              <template v-slot:item.status="{ item }">
                <div>
                  <v-chip
                    :color="item.status === '运行中' ? 'green' : 'red'"
                    :text="item.status "
                    class="text-uppercase"
                    size="small"
                    label
                  ></v-chip>
                </div>
              </template>
              <template v-slot:item.id="{ item }">

                <v-btn
                  :to="'/device/panel/' + item.id"
                  class="text-none"
                  color="primary"
                  min-width="92"
                  variant="text"
                  rounded
                >
                  <div class="text-decoration-underline">
                    {{ item.id }}
                  </div>
                </v-btn>

              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>

<style scoped>

</style>
