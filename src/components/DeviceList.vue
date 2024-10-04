<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="mb-5">板子列表</h2>

            <!-- FIXME: 这里使用如下样式的表格 -->
            <v-data-table :items="device_detail_list" :headers="headers" :items-per-page-text="'每页条目:'">
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
                    :color="item.status === '在线' ? 'green' : 'red'"
                    :text="item.status "
                    class="text-uppercase"
                    size="small"
                    label
                  ></v-chip>
                </div>
              </template>
              <template v-slot:item.deviceName="{ item }">

                <v-btn
                  :to="'/device/panel/' + item.deviceName"
                  class="text-none"
                  color="primary"
                  min-width="92"
                  variant="text"
                  rounded
                >
                  <div class="text-decoration-underline">
                    {{ item.deviceName }}
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


// export default defineComponent({

// iotId: 'ServerList',
// data() {
//   return {
const headers = ref([
  {key: 'deviceName', title: '设备名'},
  {key: 'iotId', title: 'IoT实例ID'},
  {key: 'operator', title: '操作员'},
  {key: 'status', title: '状态'},
  {key: 'task', title: '任务'},
  {key: 'note', title: '备注'},
])

const servers = ref([
  // 示例数据
  {
    deviceName: 'test1',
    iotId: 'NEXkBWuB8vHO1ibzcPAdia6600',
    operator: 'admin',
    status: '在线',
    task: '1',
    note: '无',
  }
])


type Detail = {
  deviceName?: string;
  iotId?: string;
  note?: string;
  operator?: string;
  status?: string;
  task?: string;
}

type DeviceList = {
  device_name?: string;
}

const device_detail_list = ref<Detail[]>([])

const device_list = ref<DeviceList[]>([])


onMounted(() => {
  console.log('mounted')

  apiIns.deviceListGet().then((res) => {
    console.log(res.data)
    device_list.value = res.data
  }).then(() => {
    console.log('device_list:')
    console.log(device_list.value)

    apiIns.deviceDetailPost({device_name_list: device_list.value.map(item => item.device_name)}).then((res) => {
      console.log(res.data)
      device_detail_list.value = res.data
    })
  })

})
</script>

<style scoped>

</style>
