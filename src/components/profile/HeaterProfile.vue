<script setup lang="ts">

import {ref} from "vue";

const headers = ref([
  {key: 'id', title: '配置ID'},
  {key: 'hp_name', title: '配置名称'},
  {key: 'duration', title: '持续时间(s)'},
  {key: 'time_base', title: '时基(ms)'},
  {key: 'ttv', title: '温度-时间图'},
])

const query_data_sample = ref([
  // 示例数据


  // 1,heater_1,600.600000,140,"[[320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429]]"
  // 2,heater_1,600.600000,140,"[[320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429]]"
  // 3,heater_301,18.340000,140,"[[100, 2], [100, 41], [200, 2], [200, 14], [200, 14], [200, 14], [320, 2], [320, 14], [320, 14], [320, 14]]"
  // 4,heater_321,18.900000,140,"[[100, 43], [320, 2], [320, 2], [200, 2], [200, 21], [200, 21], [320, 2], [320, 14], [320, 14], [320, 14]]"

  {
    id: '1',
    hp_name: 'heater_1',
    duration: 600.600000,
    time_base: 140,
    ttv: [[320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429]]
  },
  {
    id: '2',
    hp_name: 'heater_1',
    duration: 600.600000,
    time_base: 140,
    ttv: [[320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429], [320, 429]]
  },
  {
    id: '3',
    hp_name: 'heater_301',
    duration: 18.340000,
    time_base: 140,
    ttv: [[100, 2], [100, 41], [200, 2], [200, 14], [200, 14], [200, 14], [320, 2], [320, 14], [320, 14], [320, 14]]
  },
  {
    id: '4',
    hp_name: 'heater_321',
    duration: 18.900000,
    time_base: 140,
    ttv: [[100, 43], [320, 2], [320, 2], [200, 2], [200, 21], [200, 21], [320, 2], [320, 14], [320, 14], [320, 14]]
  },


]);


let calced_list_data = query_data_sample.value.map((item) => {
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
});

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
