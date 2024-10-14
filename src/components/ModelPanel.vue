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




        <v-container max-width="1280px">
          <v-row>
            <v-col>
              <v-btn color="primary" @click="refreshServer">
                <v-icon left>mdi-refresh</v-icon>
                刷新
              </v-btn>
            </v-col>

          </v-row>

          <v-tabs
            v-model="tab"
            background-color="primary"
            align-tabs="center"
          >
            <v-tab :value="1">Overview</v-tab>
            <v-tab :value="2">Runs</v-tab>
            <v-tab :value="3">Notes</v-tab>
            <v-tab :value="4">Settings</v-tab>
          </v-tabs>


          <v-tabs-window v-model="tab">
            <v-tabs-window-item
              :key="1"
              :value="1"
            >
              <v-container fluid>
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-card class="pa-3" height="100%">
                              <v-row>
                                <v-col>
                                  <v-card-title>
                                    <v-icon left>mdi-information-outline</v-icon>
                                    摘要
                                  </v-card-title>
                                </v-col>
                                <v-col class="d-flex justify-end">
                                  <v-btn
                                    color="primary"
                                    @click="reCalcLabelStat"
                                    :loading="reCalcLabelStatLoading"
                                  >
                                    <v-icon left>mdi-refresh</v-icon>
                                    重新统计
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <v-divider></v-divider>
                              <v-card-text class="card-content">
                                <v-row>
                                  <v-col cols="6">
                                    <v-list lines="one">
                                      <v-list-item
                                        :title="'ID'"
                                        :subtitle="modelId.toString()"
                                      ></v-list-item>

                                      <v-list-item
                                        :title="'名称'"
                                        :subtitle="label_detail?.labelName"
                                      ></v-list-item>


                                    </v-list>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-list lines="one">


                                      <v-list-item
                                        :title="'Run数量'"
                                        :subtitle="label_detail?.sampleNum"
                                      ></v-list-item>

                                      <v-list-item
                                        :title="'当前Run'"
                                        :subtitle="label_detail?.dpNum"
                                      ></v-list-item>

                                    </v-list>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-col>

                        </v-row>



                <v-row class="mt-4">
                  <v-col cols="12" md="6">
                    <v-card>
                      <v-card-title>Total runs: 2</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col>
                            <v-card
                            style="background-color: rgba(20, 115, 230, 0.1);"
                            >
                              <v-row>
                              <v-col><v-icon>mdi-table</v-icon></v-col>
                              <v-col>
                                <v-row>Runs</v-row>
                                <v-row><div>2</div></v-row>
                              </v-col>
                              </v-row>

                            </v-card>

                          </v-col>
                          <v-col>
                            <v-btn icon color="grey">
                              <v-icon>mdi-archive</v-icon>
                            </v-btn>
                            Archived
                            <div>0</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card>
                      <v-card-title>Runs status</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col>
                            <v-btn icon color="green">
                              <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                            Active
                            <div>0</div>
                          </v-col>
                          <v-col>
                            <v-btn icon color="grey">
                              <v-icon>mdi-check-circle</v-icon>
                            </v-btn>
                            Finished
                            <div>2</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>


                <v-card class="mt-4">
                  <v-card-title>Activity</v-card-title>
                  <v-card-text>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>07 Jun 2024</v-list-item-title>
                          <v-list-item-subtitle>02:56:47 AM Started a run: <a href="#">TFC/2024-06-07_02-56-46</a>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>06 Jun 2024</v-list-item-title>
                          <v-list-item-subtitle>16:53:32 PM Started a run: <a href="#">TFC/2024-06-06_16-53-31</a>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-tabs-window-item>

            <v-tabs-window-item
              :key="2"
              :value="2">
                <v-card>
                  <v-card-title>Experiment Runs (2/0)</v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="runs"
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Experiment Runs (2/0)</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                          </v-btn>
                        </v-toolbar>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>

            </v-tabs-window-item>

            <v-tabs-window-item
              :key="3"
              :value="3">
              <v-card>
                <v-row class="pa-3">
                  <v-col>
                    <v-card-title>
                      <v-icon left>mdi-information-outline</v-icon>
                      Note
                    </v-card-title>
                  </v-col>
                  <v-col class="d-flex justify-end align-center">
                    <v-btn
                      color="primary"
                      @click="reCalcLabelStat"
                      :loading="reCalcLabelStatLoading"
                    >
                      <v-icon left>mdi-refresh</v-icon>
                      Save
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-text>

                  <v-textarea
                    v-model="label_detail_state.note"
                    label="Note"
                    outlined
                    rows="30"
                    auto-grow
                    :rules="noteRules"
                  ></v-textarea>

                </v-card-text>
              </v-card>

            </v-tabs-window-item>












          </v-tabs-window>


        </v-container>




      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {defineComponent, ref, onMounted, onBeforeUnmount} from 'vue'
import {useRoute} from "vue-router";
import TopBar from "@/components/TopBar.vue";
import * as api from "@/api_client/api";


import {apiBaseUrl} from "@/config";

const apiIns = new api.FrontendApi({basePath: apiBaseUrl});

const route = useRoute();
const modelId = ref(route.params.id);
const pageTitle = ref('模型面板')


const tab = ref(null)


type Detail = {
  concentration: number;
  dpNum: number;
  father: number;
  id: number;
  img: string[];
  labelName: string;
  nlDescription: string;
  note: string;
  sampleNum: number;
}


const reCalcLabelStatLoading = ref(false)
const label_detail = ref<Detail>()
const label_detail_state_init = ref<Detail>()
const label_detail_state = ref<Detail>(
  {
    concentration: 0,
    dpNum: 0,
    father: 0,
    id: 0,
    img: [''],
    labelName: '',
    nlDescription: '',
    note: '',
    sampleNum: 0,
  }
)

type LabelCandidate = {
  id: number;
  label_name: string;
}

const label_candidates = ref<LabelCandidate[]>([
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


const headers = [
  { text: 'Run', align: 'start', sortable: false, value: 'name' },
  { text: 'Date', value: 'date' },
  { text: 'Duration', value: 'duration' },
  { text: 'epoch_time', value: 'epoch_time' },
  { text: 'loss', value: 'loss' },
  { text: 'CPU (%)', value: 'cpu' },
  { text: 'Disk (%)', value: 'disk' },
];

const runs = [
  {
    name: '2024-06-07_02-56-46',
    date: '02:56:47 · 07 Jun, 24',
    duration: '24min 36sec',
    epoch_time: 'step: 4999 / value: 1.33013916',
    loss: 'step: 4999 / value: 7.67886209',
    cpu: '77.2',
    disk: '35.7',
  },
  {
    name: '2024-06-06_16-53-31',
    date: '16:53:32 · 06 Jun, 24',
    duration: '2min 56sec',
    epoch_time: 'step: 499 / value: 1.61735344',
    loss: 'step: 499 / value: 7.97887087',
    cpu: '78.1',
    disk: '35.7',
  },
];


const label_img_state_init = ref<string[]>()

const label_img_state = ref<string[]>([
  'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
  'https://cdn.vuetifyjs.com/images/cards/plant.jpg',
])


const detail_form_valid = ref(false)

const labelStrRules = [
  (v: string) => !!v || '不能为空',
  (v: string) => (v && v.length <= 250) || '长度不能超过250个字符',
  (v: string) => /^[a-zA-Z0-9_\-\/.{}]+$/.test(v) || '只能包含大小写字母、数字和_\\-/.{}',
  (v: string) => !/\s/.test(v) || '不能包含空格',
]

const nlDescriptionRules = [
  (v: string) => (v.length <= 250) || '长度不能超过250个字符',
]

const noteRules = [
  (v: string) => (v.length <= 900) || '长度不能超过900个字符',
]


const reCalcLabelStat = () => {
  console.log('reCalcLabelStat')
  reCalcLabelStatLoading.value = true
  apiIns.labelCalcStatPost(label_detail_state.value.id).then((res) => {
    console.log(res)
    fetchLabelDetailState()
  }).then(() => {
    reCalcLabelStatLoading.value = false
  })

}


const fetchLabelDetailState = () => {
  apiIns.labelDetailPost({id_list: [parseInt(modelId.value)]}).then((res) => {
    console.log(res)
    label_detail.value = res.data[0]
    // copy of label_detail
    label_detail_state_init.value = JSON.parse(JSON.stringify(label_detail.value))
    label_detail_state.value = JSON.parse(JSON.stringify(label_detail_state_init.value))

    label_img_state_init.value = JSON.parse(JSON.stringify(label_detail.value.img))
    label_img_state.value = JSON.parse(JSON.stringify(label_img_state_init.value))
  })
}

onMounted(() => {
  console.log('mounted')
  console.log('env:' + process.env.OSS_ACCESS_KEY_ID)

  // apiIns.labelDetailPost({id_list: [parseInt(labelId.value)]}).then((res) => {
  //   console.log(res)
  //   label_detail.value = res.data[0]
  //   // copy of label_detail
  //   label_detail_state_init.value = JSON.parse(JSON.stringify(label_detail.value))
  //   label_detail_state.value = JSON.parse(JSON.stringify(label_detail_state_init.value))
  //
  //   label_img_state_init.value = JSON.parse(JSON.stringify(label_detail.value.img))
  //   label_img_state.value = JSON.parse(JSON.stringify(label_img_state_init.value))
  // })


  apiIns.labelListGet().then((response) => {
    label_candidates.value = response.data;
  }).catch((error) => {
    console.error(error);
  });

  fetchLabelDetailState()

})


let updateInterval = ref<number>();


onMounted(() => {
  updateInterval.value = setInterval(() => {
    // 这里是你的更新板子在线用户的函数
    // updateOnlineUsers();

  }, 10000); // 每10秒执行一次
});

onBeforeUnmount(() => {
  clearInterval(updateInterval.value); // 在组件卸载前清除定时器
});


const refreshServer = () => {
  // 刷新页面
  location.reload()
}


</script>

<style>
.text-center {
  text-align: center;
}

.card-content {
  padding-bottom: 20px; /* adjust as needed */
}


.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


</style>
