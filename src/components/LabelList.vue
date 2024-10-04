<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="mb-5">标签列表</h2>

            <!-- FIXME: 这里使用如下样式的表格 -->
            <v-data-table :items="label_detail_list" :headers="headers" :items-per-page-text="'每页条目:'">
              <!--                  <template v-slot:header.stock>-->
              <!--                    <div class="text-end">Stock</div>-->
              <!--                  </template>-->
              <!--                  <v-data-table-->
              <!--                    :headers="playerTableHeaders"-->
              <!--                    :items="onlinePlayers"-->
              <!--                    :search="search"-->
              <!--                  ></v-data-table>-->

              <template v-slot:item.img="{ item }">
                <v-card class="my-2" elevation="2" rounded>
                  <v-img
                    :src="item.img"
                    height="64"
                    cover
                  ></v-img>
                </v-card>
              </template>

              <template v-slot:item.concentration="{ item }">
                <v-rating
                  :model-value="item.concentration"
                  half-increments
                  readonly
                  hover
                  color="orange-darken-2"
                  density="compact"
                  size="small"
                ></v-rating>
              </template>

              <!--              <template v-slot:item.status="{ item }">-->
              <!--                <div>-->
              <!--                  <v-chip-->
              <!--                    :color="item.status === '运行中' ? 'green' : 'red'"-->
              <!--                    :text="item.status "-->
              <!--                    class="text-uppercase"-->
              <!--                    size="small"-->
              <!--                    label-->
              <!--                  ></v-chip>-->
              <!--                </div>-->
              <!--              </template>-->
              <template v-slot:item.labelId="{ item }">

                <v-btn
                  :to="'/label/panel/' + item.labelId"
                  class="text-none"
                  color="primary"
                  min-width="92"
                  variant="text"
                  rounded
                >
                  <div class="text-decoration-underline">
                    {{ item.labelId }}
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
import {ref, onMounted, onBeforeUnmount, watch,} from 'vue'
import TopBar from "@/components/TopBar.vue";
import * as api from "@/api_client/api";


const apiIns = new api.DevicePanelApi({basePath: "http://localhost:3090"});

const headers = ref([
  {key: 'labelId', title: '标签ID'},
  {key: 'labelStr', title: '标签名称'},
  {key: 'nlDescription', title: '语言描述'},
  {key: 'img', title: '图片'},
  {key: 'concentration', title: '浓度主观评价'},
  {key: 'father', title: '父级'},
  {key: 'sampleNum', title: '样本数量'},
  {key: 'dpNum', title: '数据点数量'},
  {key: 'note', title: '备注'},
])

type Detail = {
  labelId?: number;
  labelStr?: string;
  nlDescription?: string;
  img?: string;
  concentration?: number;
  father?: number;
  sampleNum?: number;
  dpNum?: number;
  note?: string;
}

const label_detail_list = ref<Detail[]>([])

const label_list = ref([
  {
    id: -1,
    label_name: 'undefined-1'
  },
])


onMounted(() => {
  console.log('mounted')

  apiIns.labelListGet().then((res) => {
    console.log(res)
    label_list.value = res.data
  }).then(() => {
    console.log('label_list:')
    console.log(label_list.value)

    apiIns.labelDetailPost({id_list: label_list.value.map(item => item.id)}).then((res) => {
      console.log(res)
      label_detail_list.value = res.data
    })
  })

})

</script>

<style scoped>

</style>
