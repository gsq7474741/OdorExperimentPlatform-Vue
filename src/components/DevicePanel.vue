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
          <!--          <v-col class="d-flex justify-end">-->
          <!--            <v-btn color="primary" @click="uploadConfig">-->
          <!--              <v-icon left>mdi-cloud-refresh</v-icon>-->
          <!--              保存配置并重启板子-->
          <!--            </v-btn>-->
          <!--          </v-col>-->
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
                  <v-col cols="6" md="4">
                    <v-list lines="one">
                      <v-list-item
                        :title="'设备名称'"
                        :subtitle="deviceName"
                      ></v-list-item>

                      <v-list-item
                        :title="'状态'"
                      >
                        <v-list-item-subtitle>
                          <div
                            :class="{ 'text-success': deviceStatus.deviceStatus === '正常', 'text-danger': deviceStatus.deviceStatus !== '正常' }">
                            {{ deviceStatus.deviceStatus }}
                          </div>
                        </v-list-item-subtitle>

                      </v-list-item>

                    </v-list>
                  </v-col>
                  <v-col cols="6" md="8">
                    <v-list lines="one">


                      <v-list-item
                        :title="'区域'"
                        :subtitle="deviceStatus.serverRegion"
                      ></v-list-item>

                      <v-list-item
                        :title="'IoT实例'"
                        :subtitle="deviceStatus.iotId"
                      ></v-list-item>

                      <v-list-item
                        :title="'使能周期'"
                        :subtitle="deviceStatus.dutyCycle"
                      ></v-list-item>

                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">


            <v-confirm-edit v-model="new_sample_model"
                            @save="save_new_sample"
                            @cancel="cancel_new_sample"
                            ok-text="检查" cancel-text="重置">
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
                          :color="!label_candidates.some(label => label.label_name === proxyModel.value.label) ? 'blue' : 'green'"
                          label
                        >
                          {{
                            !label_candidates.some(label => label.label_name === proxyModel.value.label) ? '新增' : '现有'
                          }}
                        </v-chip>


                      </template>
                    </v-combobox>

                    <v-row>
                      <v-col cols="6">
                        <v-combobox
                          label="加热配置 HP"
                          v-model="proxyModel.value.hp"
                          :items="hp_candidates.map(hp => hp.hp_name)"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="6">
                        <v-combobox
                          label="使能配置 RDC"
                          v-model="proxyModel.value.rdc"
                          :items="rdc_candidates.map(rdc => rdc.rdc_name)"
                        ></v-combobox>
                      </v-col>
                    </v-row>

                    <v-dialog v-model="confirmDialog" max-width="500">
                      <v-card>
                        <v-card-title class="headline">确认</v-card-title>
                        <v-card-text>是否开始新样本的采集？</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="red darken-1" @click="cancelSave">取消</v-btn>
                          <v-btn color="green darken-1" @click="confirmSave">确认</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-alert v-model="showErrorAlert" type="error" dismissible>
                      {{ errorMessage }}
                    </v-alert>

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
                当前样本状态
              </v-card-title>
              <v-divider></v-divider>

              <v-row class="pt-3">
                <v-col cols="6">
                  <v-list-item
                    :title="'样本ID'"
                    :subtitle="currentSample.sampleId"
                  ></v-list-item>
                </v-col>
                <v-col cols="6">
                  <v-list-item
                    :title="'标签ID/名称'"
                    :subtitle="currentSample.labelId+ ' : ' +currentSample.labelName"
                  ></v-list-item>
                </v-col>
              </v-row>
              <v-list lines="one">


                <v-list-item
                  :title="'开始时间'"
                  :subtitle="currentSample.startDateTime.toLocaleString()"
                ></v-list-item>

                <v-list-item
                  :title="'持续时间'"
                  :subtitle="recordedTime"
                ></v-list-item>

                <v-list-item
                  :title="'已记录数据点（估计）'"
                  :subtitle="recordedDataPoints"
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
              <v-row>
                <v-col>
                  <v-card-title>
                    <v-icon left>mdi-chart-line</v-icon>
                    实时图表
                  </v-card-title>
                </v-col>


                <v-col class="d-flex justify-end">
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col class="d-flex justify-end" cols="4">
                      <v-switch
                        v-model="liveUpdateEnabled"
                        label="Live Update"
                      ></v-switch>
                    </v-col>

                    <v-col class="d-flex justify-end">
                      <v-select
                        class="mr-3"
                        height="30"
                        v-model="chartFieldSelect"
                        :items="chartFieldSelectItems"
                        item-title="name"
                        item-value="field"
                        label="Select"
                        variant="underlined"
                        return-object
                        single-line
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex justify-end">
                      <v-select
                        class="mr-3"
                        height="30"
                        v-model="chartSensorSelect"
                        :items="chartSensorSelectItems"
                        item-title="name"
                        item-value="field"
                        label="Select"
                        variant="underlined"
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-divider/>
              <v-card-text>

                <e-charts class="chart" :option="option"/>
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
                <template>
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
import {ref, onMounted, onBeforeUnmount, watch,} from 'vue'
import {useRoute} from "vue-router";
import TopBar from "@/components/TopBar.vue";

const option = ref({
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    scale: true
  },
  legend: {
    textStyle: {
      color: '#ffffff' // 设置图例文字颜色为白色
    }
  },
  series: []
});


const route = useRoute();
const pageTitle = ref('板子控制台')

const deviceName = ref(route.params.id.toString());
// const deviceStatus = ref('正常')
// const serverRegion = ref('华北 | 北京')
// const iotId = ref('NEXkBWuB8vHO1ibzcPAdia6600')
// const dutyCycle = ref('RDC-5-10')

const deviceStatus = ref({
  deviceName: 'test1',
  deviceStatus: '正常',
  serverRegion: '华北 | 北京',
  iotId: 'NEXkBWuB8vHO1ibzcPAdia6600',
  dutyCycle: 'RDC-5-10'
})

// const startDateTime = ref(new Date('2024/9/21 00:00:22.005'));
const recordedTime = ref('00:00:00');
let updateInterval = ref<number>();
// const currentSampleId = ref(31);
// const currentLabelId = ref(2);
// const currentLabelName = ref('test1');
const recordedDataPoints = ref(0);

const liveUpdateEnabled = ref(false);
let liveUpdateInterval = ref<number | null>(null);
// 'temperature', 'pressure', 'relative_humidity', 'resistance_gas_sensor'
const chartFieldSelect = ref({name: '气体阻抗', field: 'resistance_gas_sensor'},);

const chartFieldSelectItems = ref([
    {name: '气体阻抗（标准化后）', field: 'resistance_gas_sensor'},
    {name: '温度', field: 'temperature'},
    {name: '压力', field: 'pressure'},
    {name: '相对湿度', field: 'relative_humidity'},

  ]
)


const chartSensorSelect = ref({name: 'Sensor 1', sensor_idx: '0'},);

const chartSensorSelectItems = ref([
    {name: 'Sensor 1', sensor_idx: '0'},
    {name: 'Sensor 2', sensor_idx: '1'},
    {name: 'Sensor 3', sensor_idx: '2'},
    {name: 'Sensor 4', sensor_idx: '3'},
    {name: 'Sensor 5', sensor_idx: '4'},
    {name: 'Sensor 6', sensor_idx: '5'},
    {name: 'Sensor 7', sensor_idx: '6'},
    {name: 'Sensor 8', sensor_idx: '7'},
  ]
)


type DataPoint = [string, string];
type Series = {
  name: string,
  type: string,
  data: DataPoint[]
}


// 将字符串转换为数字
function parseData(seriesData: DataPoint[]): number[] {
  return seriesData.map(point => parseFloat(point[1]));
}

// 计算均值
function calculateMean(data: number[]): number {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

// 计算标准差
function calculateStdDev(data: number[], mean: number): number {
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
}

// 标准化数据
function standardizeData(series: Series): Series {
  const numericData = parseData(series.data);
  const mean = calculateMean(numericData);
  const stdDev = calculateStdDev(numericData, mean);
  const standardizedData = series.data.map(([timestamp, value]) => {
    const numValue = parseFloat(value);
    const standardizedValue = (numValue - mean) / stdDev;
    return [timestamp, standardizedValue.toString()] as DataPoint;
  });

  return {
    ...series,
    data: standardizedData
  };
}

// const standardizedSeriesData: SeriesData = {
//   series: data.series.map(standardizeData)
// };


const fetchChartData = (field: string, sensor_idx: number) => {
  const now = new Date();
  const timeAgo = new Date(now.getTime() - 15 * 60 * 1000);

  apiIns.dataPointLatestFigPost({
    deviceName: deviceName.value,
    startTime: timeAgo.toLocaleString(),
    endTime: now.toLocaleString(),
    field: field,
    sensor_idx: sensor_idx
  }).then((response) => {
    console.log(response.data);
    option.value.series = response.data.series;

    if (field === 'resistance_gas_sensor') {
      // standardize
      option.value.series = response.data.series.map(standardizeData);
    }

  }).catch((error) => {
    console.error(error);
  });
};

const startLiveUpdate = () => {
  if (liveUpdateInterval.value) {
    clearInterval(liveUpdateInterval.value);
  }
  liveUpdateInterval.value = setInterval(() => {
    fetchChartData(chartFieldSelect.value.field, chartSensorSelect.value.sensor_idx);
  }, 5000); // Update every 5 seconds
};

const stopLiveUpdate = () => {
  if (liveUpdateInterval.value) {
    clearInterval(liveUpdateInterval.value);
    liveUpdateInterval.value = null;
  }
};

watch(liveUpdateEnabled, (newVal) => {
  if (newVal) {
    startLiveUpdate();
  } else {
    stopLiveUpdate();
  }
});

watch(chartSensorSelect, (newVal) => {
  console.log(newVal);
  fetchChartData(chartFieldSelect.value.field, newVal.sensor_idx);
});

watch(chartFieldSelect, (newVal) => {
  // option.value.yAxis = {
  //   type: newVal.field === 'resistance_gas_sensor' ? 'log' : 'value',
  //   scale: true
  // }
  fetchChartData(newVal.field, chartSensorSelect.value.sensor_idx);

});


const currentSample = ref({
  sampleId: 31,
  labelId: 2,
  labelName: 'test1',
  startDateTime: new Date('2024/9/21 00:00:22.005'),
});

const new_sample_model = ref({
  label: 'undefined',
  hp: '',
  rdc: ''
});

import * as api from "@/api_client/api";

import {apiBaseUrl} from "@/config";

const apiIns = new api.FrontendApi({basePath: apiBaseUrl});


const calculateRecordedTime = () => {
  const now = new Date();
  const diff = now.getTime() - currentSample.value.startDateTime.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  recordedTime.value = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  recordedDataPoints.value = Math.floor(diff / 1000 / 60 * 50); // 每分钟记录50数据点
};

onMounted(() => {
  updateInterval.value = setInterval(calculateRecordedTime, 1000);

  apiIns.deviceDeviceNameStatusGet(deviceName.value).then((response) => {
    deviceStatus.value = response.data;
  }).catch((error) => {
    console.error(error);
  });

  fetchChartData(chartFieldSelect.value.field, chartSensorSelect.value.sensor_idx);

  apiIns.labelListGet().then((response) => {
    label_candidates.value = response.data;
  }).catch((error) => {
    console.error(error);
  });

  apiIns.hpListGet().then((response) => {
    hp_candidates.value = response.data;
  }).catch((error) => {
    console.error(error);
  });

  apiIns.rdcListGet().then((response) => {
    rdc_candidates.value = response.data;
  }).catch((error) => {
    console.error(error);
  });

  apiIns.sampleDeviceNameCurrentGet(deviceName.value).then((response) => {
    currentSample.value = {
      // sampleId: 31,
      // labelId: 2,
      // labelName: 'test1',
      // startDateTime: new Date('2024/9/21 00:00:22.005'),
      sampleId: response.data.sampleId,
      labelId: response.data.labelId,
      labelName: response.data.labelName,
      startDateTime: new Date(response.data.startDateTime),
    };
  }).catch((error) => {
    console.error(error);
  });

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


// const isNewLabel = computed(() => {
//   return !label_candidates.value.some(label => label.label_name === new_sample_model.value.label);
// });

const confirmDialog = ref(false);
const showErrorAlert = ref(false);
const errorMessage = ref('');

const save_new_sample = async () => {
  // Simulate a call to the backend to validate data
  apiIns.sampleValidPost({
    label: new_sample_model.value.label,
    hp: new_sample_model.value.hp,
    rdc: new_sample_model.value.rdc
  }).then((response) => {
    console.log(response);
    if (response.data.isValid) {
      confirmDialog.value = true;
    } else {
      errorMessage.value = response.data.errorMessage;
      showErrorAlert.value = true;
    }

  }).catch((error) => {
    console.error(error);
  });


};

const cancel_new_sample = async () => {
  // Simulate a call to the backend to validate data
  new_sample_model.value = {
    label: 'undefined',
    hp: '',
    rdc: ''
  };
};

const validateData = async (data) => {
  // Simulate a backend call
  // Replace this with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isValid: data.label !== '' && data.hp !== '' && data.rdc !== '',
        errorMessage: 'Data validation failed: Null values not allowed'
      });
    }, 300);
  });
};

const confirmSave = () => {
  confirmDialog.value = false;
  // Add logic to start new sample collection
  apiIns.sampleNewPost({
    label: new_sample_model.value.label,
    hp: new_sample_model.value.hp,
    rdc: new_sample_model.value.rdc,
    deviceName: deviceName.value
  }).then((response) => {
    console.log(response);
    currentSample.value = {
      sampleId: response.data.sampleId,
      labelId: response.data.labelId,
      labelName: response.data.labelName,
      startDateTime: new Date(response.data.startDateTime),
    };
  }).catch((error) => {
    console.error(error);
  });

};

const cancelSave = () => {
  confirmDialog.value = false;
};


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
  // 直接刷新页面
  location.reload();
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

.chart {
  height: 600px;
}


</style>
