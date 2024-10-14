<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container >
        <v-row>
          <v-col>
            <h2 class="mb-5">模型列表</h2>

            <v-data-table
              :items="model_detail_list.map(c => ({...c,
              trainTime: new Date(c.trainTime).toLocaleString(),
              accTrain: (c.accTrain * 100).toFixed(2) + '%',
              accOnline: (c.accOnline * 100).toFixed(2) + '%' }))"
              :headers="headers"
              :items-per-page-text="'每页条目:'"
            >

              <!--              <template v-slot:item.img="{ item }">-->
              <!--                <v-card class="my-2" elevation="2" rounded>-->
              <!--                  <v-img-->
              <!--                    :src="item.img"-->
              <!--                    height="64"-->
              <!--                    cover-->
              <!--                  ></v-img>-->
              <!--                </v-card>-->
              <!--              </template>-->

              <template v-slot:item.id="{ item }">
                <v-btn
                  :to="'/model/panel/' + item.id"
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

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch,} from 'vue'
import TopBar from "@/components/TopBar.vue";
import * as api from "@/api_client/api";

import {apiBaseUrl} from "@/config";

const apiIns = new api.FrontendApi({basePath: apiBaseUrl});

const headers = ref([
  {key: 'id', title: '模型ID'},
  {key: 'name', title: '模型名称'},
  {key: 'description', title: '描述'},
  {key: 'numClass', title: '训练类别数量'},
  {key: 'trainTime', title: '训练时间'},
  {key: 'accTrain', title: '训练准确率'},
  {key: 'accOnline', title: '在线准确率'},
  {key: 'numRuns', title: 'Run数量'},
  {key: 'currentRun', title: '当前Run'},
  {key: 'note', title: '备注'},
])

type Detail = {
  accOnline: number;
  accTrain: number;
  currentRun: string;
  description: null | string;
  id: number;
  name: string;
  note: string;
  numClass: number;
  numRuns: number;
  trainTime: string;
}

const model_detail_list = ref<Detail[]>([])

const model_list = ref([
  {
    id: -1,
    name: 'undefined-1'
  },
])


onMounted(() => {
  console.log('mounted')

  apiIns.modelListGet().then((res) => {
    console.log(res)
    model_list.value = res.data
  }).then(() => {
    console.log('model_list:')
    console.log(model_list.value)

    apiIns.modelDetailPost({id_list: model_list.value.map(item => item.id)}).then((res) => {
      console.log(res)
      model_detail_list.value = res.data
    })
  })

})

</script>

<style scoped>

</style>
