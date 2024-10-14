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
                        :subtitle="labelId.toString()"
                      ></v-list-item>

                      <v-list-item
                        :title="'名称'"
                        :subtitle="label_detail?.labelName"
                      ></v-list-item>

                      <v-list-item
                        :title="'父级'"
                        :subtitle="label_candidates?.find( i => i.id===label_detail?.father) ? label_candidates?.find( i => i.id===label_detail?.father).label_name : '...'"
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
                          v-model="label_detail_state.labelName"
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
                        <v-autocomplete
                          v-model="label_detail_state.father"
                          :items="label_candidates"
                          hint="选择或输入现有标签"
                          color="blue-grey-lighten-2"
                          item-title="label_name"
                          item-value="id"
                          label="父标签"
                        ></v-autocomplete>
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
                      <v-col cols="12">
                        <v-textarea
                          v-model="label_detail_state.note"
                          :counter="900"
                          :rules="noteRules"
                          rows="1"
                          label="备注"
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
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="me-4"
                        @click="submitDetailForm"
                      >
                        提交
                      </v-btn>

                      <v-btn @click="resetDetailForm">
                        重置
                      </v-btn>
                    </v-card-actions>

                  </v-container>
                </v-form>

              </v-card-text>
            </v-card>


          </v-col>

        </v-row>


        <v-row>
          <v-col cols="24">
            <v-dialog v-model="dialog" max-width="800px">
              <v-card>
                <v-img :src="selectedImage" aspect-ratio="1.75"></v-img>
              </v-card>
            </v-dialog>


            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>图片</v-card-title>
              <v-card-text>
                <v-container fluid>
                  <transition-group name="list" tag="v-card" dense>
                    <v-row>
                      <v-col
                        v-for="url in label_img_state"
                        :key="url"
                        :cols="4"
                      >
                        <v-card>
                          <v-img
                            :src="url"
                            class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            cover
                          >
                            <v-card-title class="text-white" v-text="label_img_state.indexOf(url)"></v-card-title>
                          </v-img>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="medium-emphasis"
                              icon="mdi-fullscreen"
                              size="small"
                              @click="showImage(url)"
                            ></v-btn>

                            <v-btn
                              color="medium-emphasis"
                              icon="mdi-delete"
                              size="small"
                              @click="deletePic(url)"
                            ></v-btn>
                          </v-card-actions>
                        </v-card>

                      </v-col>
                      <v-col cols="4">
                        <v-container height="100%" style="display:flex; align-items: center; justify-content: center;">
                          <!--                        添加新图片的按钮-->
                          <v-btn
                            color="primary"
                            icon
                            style="align-self: center; text-align:center;"
                            size="100"
                            class="ma-4"
                            @click="triggerFileInput"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;"/>


                        </v-container>
                      </v-col>
                    </v-row>
                  </transition-group>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="me-4"
                  @click="submitImgForm"
                >
                  提交
                </v-btn>

                <v-btn @click="resetImgForm">
                  重置
                </v-btn>
              </v-card-actions>
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


import {apiBaseUrl} from "@/config";

const apiIns = new api.FrontendApi({basePath: apiBaseUrl});

const route = useRoute();
const labelId = ref(route.params.id);
const pageTitle = ref('标签面板')


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

const submitDetailForm = async () => {
  console.log('submitDetailForm')
  console.log(label_detail_state.value)
  apiIns.labelDetailPut({
    id: label_detail_state.value.id,
    labelName: label_detail_state.value.labelName,
    father: label_detail_state.value.father,
    concentration: label_detail_state.value.concentration,
    nlDescription: label_detail_state.value.nlDescription,
    note: label_detail_state.value.note,
  }).then(async (res) => {
    console.log(res)
    fetchLabelDetailState()
  })
}

const resetDetailForm = () => {
  label_detail_state.value = JSON.parse(JSON.stringify(label_detail_state_init.value))
}


const deletePic = (pic: string) => {
  console.log('deletePic')
  console.log(pic)
  label_img_state.value = label_img_state.value.filter(item => item !== pic)
}

const uploadToOSS = async (file: File): Promise<string | null> => {
  try {
    const res = await apiIns.ossTokenGet();
    const {policy, signature, accessid, host, stsToken} = res.data;

    let formData = new FormData();
    formData.append("success_action_status", "200"); // 指定成功上传时，服务端返回状态码200，默认返回204。
    formData.append("policy", policy);
    formData.append("signature", signature);
    formData.append("OSSAccessKeyId", accessid);
    if (stsToken) formData.append("x-oss-security-token", stsToken);

    formData.append("key", file.name); // 文件名
    formData.append("file", file); // file必须为最后一个表单域

    const param = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(host, param);
    if (response.ok) {
      console.log(response);
      alert("上传成功");
      return host + '/' + file.name;
    } else {
      console.error("Error:", response.statusText);
      alert("上传失败");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("上传失败");
    return null;
  }
};


const submitImgForm = async () => {
  console.log('submitImgForm')
  console.log(label_img_state.value)


  const uploadedUrls = [];
  for (const url of label_img_state.value) {
    if (url.startsWith('blob:')) {
      const response = await fetch(url);
      const blob = await response.blob();
      const now = new Date();
      const file_name = 'label_' + label_detail_state.value.id + '_img_' + now.toISOString().replace(/[:.]/g, '-') + '.jpg'
      console.log(file_name)
      const file = new File([blob], 'label_img/' + file_name, {type: blob.type});
      const uploadedUrl = await uploadToOSS(file);
      if (uploadedUrl) {
        console.log(uploadedUrl)
        uploadedUrls.push(uploadedUrl);
      }
    } else {
      uploadedUrls.push(url);
    }
  }
  console.log('Uploaded URLs:', uploadedUrls);
  apiIns.labelDetailPut({id: label_detail_state.value.id, img: uploadedUrls}).then(async (res) => {
    console.log(res)
    fetchLabelDetailState()
  })

}

const resetImgForm = () => {
  label_img_state.value = JSON.parse(JSON.stringify(label_img_state_init.value))
}

const dialog = ref(false);
const selectedImage = ref('');

// 省略其他代码

const showImage = (url: string) => {
  selectedImage.value = url;
  dialog.value = true;
};


const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    label_img_state.value.push(url);
  }
};

const fetchLabelDetailState = () => {
  apiIns.labelDetailPost({id_list: [parseInt(labelId.value)]}).then((res) => {
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
  // console.log('env:' + process.env.OSS_ACCESS_KEY_ID)

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
