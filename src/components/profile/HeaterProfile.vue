<script setup lang="ts">

import {ref, onMounted, onBeforeUnmount, watch,} from 'vue'
import TopBar from "@/components/TopBar.vue";
import * as api from "@/api_client/api";


const apiIns = new api.DevicePanelApi({basePath: "http://localhost:3090"});

const headers = ref([
  {key: 'id', title: '配置ID'},
  {key: 'hp_name', title: '配置名称'},
  {key: 'duration', title: '持续时间(s)'},
  {key: 'time_base', title: '时基(ms)'},
  {key: 'ttv', title: '温度-时间图'},
])

const calc_list_data = ((item: Detail) => {
  // return (item) => {
  let ttv = item.ttv;
  let times = [];
  let temps = [ttv[0][0]];
  for (let i = 0; i <= ttv.length; i++) {
    if (i === 0) {
      times.push(0);
      continue;
    }
    times.push(ttv[i - 1][1] * item.time_base / 1000 + times[i - 1]);
    temps.push(ttv[i - 1][0]);
  }
  times.push(ttv[ttv.length - 1][1] * item.time_base / 1000 + times[ttv.length - 1]);
  // 时间保留两位小数
  times = times.map((time) => time.toFixed(2));
  return {
    ...item,
    times: times,
    temps: temps,
  };
  // }

})

const hp_list = ref([
  {
    id: -1,
    hp_name: 'undefined-1'
  },
])

const hp_detail_list = ref<Detail[]>([])

const calced_list_data = ref(hp_detail_list.value.map(calc_list_data));

watch(hp_detail_list, (newVal, oldVal) => {
  calced_list_data.value = newVal.map(calc_list_data);
})

type Detail = {
  duration: number;
  hp_name: string;
  id: number;
  time_base: number;
  ttv: Array<number[]>;
}

onMounted(() => {
  console.log('mounted')

  apiIns.hpListGet().then((res) => {
    console.log(res)
    hp_list.value = res.data
  }).then(() => {
    console.log('hp_list:')
    console.log(hp_list.value)

    apiIns.hpDetailPost({id_list: hp_list.value.map(item => item.id)}).then((res) => {
      console.log(res.data)
      hp_detail_list.value = res.data
    })
  })
})


</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title class="headline">温度调制配置 Heater Profile</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table :items="calced_list_data" :headers="headers" :items-per-page-text="'每页条目:'">

              <template v-slot:item.ttv="{ item }">
                <v-sparkline
                  :model-value="item.temps"
                  :labels="item.times"

                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <!--                  <template v-slot:label="item">-->
                  <!--                    ${{ item.value }}-->
                  <!--                  </template>-->
                </v-sparkline>
              </template>

              <template v-slot:item.id="{ item }">
                <v-btn
                  :to="'/profile/heater_profile/panel/' + item.id"
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
