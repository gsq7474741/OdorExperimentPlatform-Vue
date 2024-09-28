<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="mb-5">板子列表</h2>

            <!-- FIXME: 这里使用如下样式的表格 -->
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

            <!--            <v-data-table-->
            <!--              :headers="headers"-->
            <!--              :items="servers"-->
            <!--              class="elevation-1"-->
            <!--            ></v-data-table>-->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue';
import {ref} from "vue";
import TopBar from "@/components/TopBar.vue";

// export default defineComponent({

// iotId: 'ServerList',
// data() {
//   return {
const headers = ref([
  {key: 'id', title: '设备ID（点击查看详情）'},
  {key: 'iotId', title: '实例ID'},
  {key: 'heater', title: '温度调制'},
  {key: 'status', title: '状态'},
  {key: 'task', title: '任务'},
  {key: 'note', title: '备注'},
])

const servers = ref([
  // 示例数据
  {
    id: 'test1',
    iotId: 'NEXkBWuB8vHO1ibzcPAdia6600',
    heater: 'HP-354',
    status: '运行中',
    task: '饮料气味采集',
    note: '备注1'
  },
  {
    id: 'cs2-tR7sP1vK',
    iotId: 'NEXkBWuB8vHO1ibzcPAdia6600',
    heater: 'HP-010',
    status: '停止',
    task: '肉类气味采集',
    note: ''
  },
])
//   };
// },
// });
</script>

<style scoped>

</style>
