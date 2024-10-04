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
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-3" height="100%">
              <v-card-title>
                <v-icon left>mdi-information-outline</v-icon>
                摘要
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="card-content">
                <v-row>
                  <v-col cols="6">
                    <v-list lines="one">
                      <v-list-item
                        :title="'ID'"
                        :subtitle="labelId.toString()"
                      ></v-list-item>

                      <v-list-item
                        :title="'名称'"
                        :subtitle="label_detail?.labelStr"
                      ></v-list-item>

                    </v-list>
                  </v-col>
                  <v-col cols="6">
                    <v-list lines="one">


                      <v-list-item
                        :title="'样本数量'"
                        :subtitle="label_detail?.sampleNum"
                      ></v-list-item>

                      <v-list-item
                        :title="'数据点数量'"
                        :subtitle="label_detail?.dpNum"
                      ></v-list-item>

                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="24" md="8">
            <v-card class="pa-3">
              <v-card-title>
                <v-icon left>mdi-information-outline</v-icon>
                详细信息
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="card-content">
                <v-form v-model="detail_form_valid">
                  <v-container>
                    <v-row>
                      <v-col cols="8" style="display: flex">
                        <v-text-field
                          style="align-items: center;"
                          v-model="label_detail_state.labelStr"
                          :counter="250"
                          :rules="labelStrRules"
                          label="标签名称"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-list lines="one">
                          <v-list-item
                            :title="'浓度主观评价'"
                          >
                            <v-rating
                              v-model="label_detail_state.concentration"
                              half-increments
                              hover
                              :length="5"
                              :size="27"
                              active-color="primary"
                            />

                          </v-list-item>


                        </v-list>

                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="label_detail_state.nlDescription"
                          :counter="250"
                          :rules="nlDescriptionRules"
                          label="语言描述"
                          prepend-inner-icon="mdi-comment"
                          required></v-textarea>
                      </v-col>

                    </v-row>

                    <v-row>
                      <!--              <v-checkbox-->
                      <!--                v-model="state.checkbox"-->
                      <!--                :error-messages="v$.checkbox.$errors.map(e => e.$message)"-->
                      <!--                label="Do you agree?"-->
                      <!--                required-->
                      <!--                @blur="v$.checkbox.$touch"-->
                      <!--                @change="v$.checkbox.$touch"-->
                      <!--              ></v-checkbox>-->

                                    <v-btn
                                      class="me-4"
                                      @click="submitDetailForm"
                                    >
                                      提交
                                    </v-btn>

                      <v-btn @click="resetDetailForm">
                        重置
                      </v-btn>

                    </v-row>

                  </v-container>
                </v-form>

              </v-card-text>
            </v-card>




          </v-col>

        </v-row>


        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>图片</v-card-title>
              <v-card-text>
                <div class="text-center">暂无数据</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {defineComponent, ref, onMounted, onBeforeUnmount} from 'vue'
import {useRoute} from "vue-router";
import TopBar from "@/components/TopBar.vue";

import * as api from "@/api_client/api";

const apiIns = new api.DevicePanelApi({basePath: "http://localhost:3090"});

const route = useRoute();
const labelId = ref(route.params.id);

const pageTitle = ref('标签面板')


type Detail = {
  concentration: number;
  dpNum: number;
  father: string;
  id: number;
  img: string;
  labelId: number;
  labelStr: string;
  nlDescription: string;
  note: string;
  sampleNum: number;
}

const label_detail = ref<Detail>()
const label_detail_state_init = ref<Detail>()
const label_detail_state = ref<Detail>(
  {
    concentration: 0,
    dpNum: 0,
    father: '',
    id: 0,
    img: '',
    labelId: 0,
    labelStr: '',
    nlDescription: '',
    note: '',
    sampleNum: 0,
  }
)

const detail_form_valid = ref(false)

const labelStrRules = [
  (v: string) => !!v || '不能为空',
  (v: string) => (v && v.length <= 250) || '长度不能超过250个字符',
  (v: string) => /^[a-zA-Z0-9_\-\/.{}]+$/.test(v) || '只能包含大小写字母、数字和_\\-/.{}',
  (v: string) => !/\s/.test(v) || '不能包含空格',
]

const nlDescriptionRules = [
  // (v: string) => !!v || '不能为空',
  (v: string) => (v && v.length <= 250) || '长度不能超过250个字符',
]


const submitDetailForm = () => {
  console.log('submitDetailForm')
  console.log(label_detail_state.value)
  // apiIns.labelDetailPut(label_detail_state.value).then((res) => {
  //   console.log(res)
  //   label_detail.value = JSON.parse(JSON.stringify(label_detail_state.value))
  //   label_detail_state_init.value = JSON.parse(JSON.stringify(label_detail_state.value))
  // })
}

const resetDetailForm = () => {
  label_detail_state.value = JSON.parse(JSON.stringify(label_detail_state_init.value))
}


onMounted(() => {
  console.log('mounted')


  apiIns.labelDetailPost({id_list: [parseInt(labelId.value)]}).then((res) => {
    console.log(res)
    label_detail.value = res.data[0]
    // copy of label_detail
    label_detail_state_init.value = JSON.parse(JSON.stringify(label_detail.value))
    label_detail_state.value = JSON.parse(JSON.stringify(label_detail_state_init.value))
  })

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

.text-success {
  color: green;
}

.text-danger {
  color: red;
}


</style>
