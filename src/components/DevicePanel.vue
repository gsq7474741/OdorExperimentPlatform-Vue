<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1>{{ pageTitle }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="primary" @click="refreshServer">
              <v-icon left>mdi-refresh</v-icon>
              刷新
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="primary" @click="uploadConfig">
              <v-icon left>mdi-cloud-refresh</v-icon>
              保存配置并重启板子
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-3 fill-height">
              <v-card-title>
                <v-icon left>mdi-information-outline</v-icon>
                板子状态
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="card-content">
                <v-row>
                  <v-col cols="6">
                    <v-list lines="one">
                      <v-list-item
                        :title="'设备名称'"
                        :subtitle="deviceName"
                      ></v-list-item>

                      <v-list-item
                        :title="'状态'"

                      >
                        <!--                        :subtitle="serverStatus"-->
                        <!--                        :base-color="serverStatus === '正常' ? 'green' :'red'"-->
                        <v-list-item-subtitle>
                          <div
                            :class="{ 'text-success': deviceStatus === '正常', 'text-danger': deviceStatus !== '正常' }">
                            {{ deviceStatus }}
                          </div>
                        </v-list-item-subtitle>

                      </v-list-item>

                      <!--                      <v-list-item-->
                      <!--                        :title="'IP'"-->
                      <!--                        :subtitle="serverIP"-->
                      <!--                      >-->
                      <!--                        <template v-slot:append>-->
                      <!--                          <v-tooltip text="复制 IP">-->
                      <!--                            <template v-slot:activator="{ props }">-->
                      <!--                              <v-icon small v-bind="props" v-on="on" @click="copyIP">mdi-content-copy</v-icon>-->
                      <!--                            </template>-->
                      <!--                          </v-tooltip>-->
                      <!--                        </template>-->

                      <!--                      </v-list-item>-->
                    </v-list>
                  </v-col>
                  <v-col cols="6">
                    <v-list lines="one">


                      <v-list-item
                        :title="'区域'"
                        :subtitle="serverRegion"
                      ></v-list-item>

                      <v-list-item
                        :title="'IoT实例'"
                        :subtitle="iotId"
                      ></v-list-item>

                      <v-list-item
                        :title="'使能周期'"
                        :subtitle="dutyCycle"
                      ></v-list-item>

                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <!--            <v-card class="pa-3 d-flex flex-column" height="100%">-->
            <!--              <v-card-title>-->
            <!--                <v-icon left>mdi-link</v-icon>-->
            <!--                当前标签-->
            <!--              </v-card-title>-->
            <!--              <v-divider></v-divider>-->
            <!--              <v-card-text class="card-content">-->
            <!--&lt;!&ndash;                <div class="text-center ont-weight-medium text-h5">&ndash;&gt;-->
            <!--&lt;!&ndash;                  {{ connectionTip === '' ? 'IP未生成，请稍后' : connectionTip }}&ndash;&gt;-->
            <!--&lt;!&ndash;                </div>&ndash;&gt;-->


            <!--                          </v-card-text>-->
            <!--                        </v-card>-->


            <v-confirm-edit v-model="new_sample_model" @save="save_new_sample">
              <template v-slot:default="{ model: proxyModel, actions  }">
                <v-card
                  class="pa-3 d-flex flex-column" height="100%"
                  title="开始记录新样本"
                >
                  <template v-slot:text>
                    <v-combobox
                      label="标签 Label"
                      hint="选择现有的标签或输入新的标签"
                      class="pb-3"
                      v-model="proxyModel.value.label"
                      :items="label_candidates.map(label => label.label_name)"
                    >
                      <template v-slot:append>
                        <v-chip
                          class="ma-2"
                          color="green"
                          v-if="isNewLabel"
                          label
                        >
                          新增
                        </v-chip>
                      </template>
                    </v-combobox>

                    <v-row>
                      <v-col cols="6">
                        <v-combobox
                          label="加热配置 HP"
                          v-model="proxyModel.value.hp"
                          :items="hp_candidates.map(hp => hp.hp_name.replace('heater_', 'HP-'))"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="6">
                        <v-combobox
                          label="使能配置 RDC"
                          v-model="proxyModel.value.rdc"
                          :items="rdc_candidates.map(rdc => rdc.rdc_name.replace('duty', 'RDC').replaceAll('_', '-'))"
                        ></v-combobox>
                      </v-col>
                    </v-row>

                  </template>


                  <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <component :is="actions"></component>
                  </template>
                </v-card>
              </template>
            </v-confirm-edit>


          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>
                <v-icon left>mdi-clock</v-icon>
                当前样本运行时间
              </v-card-title>
              <v-divider></v-divider>

              <v-list lines="one">


                <v-list-item
                  :title="'开始时间'"
                  :subtitle="startDateTime.toString()"
                ></v-list-item>

                <v-list-item
                  :title="'持续时间'"
                  :subtitle="recordedTime"
                ></v-list-item>


              </v-list>

              <v-card-text class="card-content">

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="24" md="8">
            <v-card
              class="pa-3 d-flex flex-column"
              height="100%"
            >
              <v-card-title>
                <v-icon left>mdi-chart-line</v-icon>
                实时图表
              </v-card-title>
              <v-divider/>
              <v-card-text>

                dafasdfsaf
              </v-card-text>
            </v-card>

          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>
                <v-icon left>mdi-chip</v-icon>
                板子传感器列表
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <template v-slot:text>
                  <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                  ></v-text-field>
                </template>

                <v-data-table
                  :headers="sensorTableHeaders"
                  :items="sensor_list_data"
                  :search="search"
                  :items-per-page-text="'每页条目:'"
                ></v-data-table>

              </v-card-text>
            </v-card>
          </v-col>

        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, computed, shallowRef} from 'vue'
import {useRoute} from "vue-router";
import TopBar from "@/components/TopBar.vue";

const route = useRoute();
const deviceName = ref(route.params.id);

const pageTitle = ref('板子控制台')
const deviceStatus = ref('正常')
const serverRegion = ref('华北 | 北京')
const iotId = ref('NEXkBWuB8vHO1ibzcPAdia6600')
const dutyCycle = ref('RDC-5-10')

const startDateTime = ref(new Date('2024/9/21 16:46:22'));
const recordedTime = ref('00:00:00');
let updateInterval = ref<number>();

const new_sample_model = shallowRef({
  label: 'undefined',
  hp: '',
  rdc: ''
});


const calculateRecordedTime = () => {
  const now = new Date();
  const diff = now.getTime() - startDateTime.value.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  recordedTime.value = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

onMounted(() => {
  updateInterval.value = setInterval(calculateRecordedTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(updateInterval.value); // 在组件卸载前清除定时器
});


const search = ref('')

const sensorTableHeaders = ref([
  // { key: 'no', title: '#' , sortable: false },
  {key: 'sensor_index', title: '编号'},
  {key: 'sensor_id', title: '序列号'},
  {key: 'sensor_hp', title: '加热配置'},

])

const sensor_list_data = ref([
  {
    sensor_index: 1,
    sensor_id: '1172132145',
    sensor_hp: 'HP-354',
  },
  {
    sensor_index: 2,
    sensor_id: '1172117555',
    sensor_hp: 'HP-010',
  },
  {
    sensor_index: 3,
    sensor_id: '1172132145',
    sensor_hp: 'HP-354',
  },
  {
    sensor_index: 4,
    sensor_id: '1172117555',
    sensor_hp: 'HP-010',
  },
  {
    sensor_index: 5,
    sensor_id: '1172132145',
    sensor_hp: 'HP-354',
  },
  {
    sensor_index: 6,
    sensor_id: '1172117555',
    sensor_hp: 'HP-010',
  },
  {
    sensor_index: 7,
    sensor_id: '1172132145',
    sensor_hp: 'HP-354',
  },
  {
    sensor_index: 8,
    sensor_id: '1172117555',
    sensor_hp: 'HP-010',
  }
])


const isNewLabel = computed(() => {
  return !label_candidates.value.some(label => label.label_name === new_sample_model.value.label);
});

const save_new_sample = () => {
  // 保存新样本的逻辑
  console.log(new_sample_model.value);
}
const label_candidates = ref([
  {
    id: 1,
    label_name: 'undefined'
  },
  {
    id: 2,
    label_name: 'test1'
  },
  {
    id: 3,
    label_name: '苹果'
  },
  {
    id: 4,
    label_name: '伊利原味酸奶'
  },
  {
    id: 5,
    label_name: '可口可乐'
  },
])
const hp_candidates = ref([
  // 2,heater_1,600.600000
  // 3,heater_301,18.340000
  // 4,heater_321,18.900000
  {
    id: 2,
    hp_name: 'heater_1'
  },
  {
    id: 3,
    hp_name: 'heater_301'
  },
  {
    id: 4,
    hp_name: 'heater_321'
  },

]);
const rdc_candidates = ref([
  // 1,duty_5_10
  // 2,duty_1_0
  {
    id: 1,
    rdc_name: 'duty_5_10'
  },
  {
    id: 2,
    rdc_name: 'duty_1_0'
  },
]);


const refreshServer = () => {
  // 刷新板子的逻辑
}

const createConfig = () => {
  // 创建配置的逻辑

}

const uploadConfig = () => {
  // 上传配置的逻辑
}

const sendCommand = () => {
  // 发送控制台命令的逻辑
}


</script>

<style>
.text-center {
  text-align: center;
}

.card-content {
  padding-bottom: 20px; /* adjust as needed */
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}


</style>
