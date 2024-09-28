<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1>{{ gameTitle }}</h1>
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
            <v-card class="pa-3">
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
                        :title="'ID'"
                        :subtitle="serverId"
                      ></v-list-item>

                      <v-list-item
                        :title="'状态'"

                      >
                        <!--                        :subtitle="serverStatus"-->
                        <!--                        :base-color="serverStatus === '正常' ? 'green' :'red'"-->
                        <v-list-item-subtitle>
                          <div
                            :class="{ 'text-success': serverStatus === '正常', 'text-danger': serverStatus !== '正常' }">
                            {{ serverStatus }}
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




<!--              </v-card-text>-->
<!--            </v-card>-->



            <v-confirm-edit v-model="model">
              <template v-slot:default="{ model: proxyModel, actions }">
                <v-card
                  class="pa-3 d-flex flex-column" height="100%"
                  max-width="320"
                  title="Update Field"
                >
                  <template v-slot:text>
                    <!--                        <v-text-field-->
                    <!--                          v-model="proxyModel.value"-->
                    <!--                          messages="Modify my value"-->
                    <!--                        ></v-text-field>-->
                    <v-combobox
                      label="Combobox"
                      v-model="proxyModel.value"
                      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    ></v-combobox>

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
                启动时间 / 截止时间
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="card-content">
                {{ startDateTime }} ~ {{ endDateTime }}
                <v-progress-linear
                  :model-value="progress"
                  :bg-color="progress <20 ? 'pink-lighten-3': progress < 40 ? 'yellow-lighten-3' : 'green-lighten-3'"
                  :color="progress <20 ? 'pink' : progress < 40 ? 'yellow' : 'green'"
                  class="mt-2"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-3 d-flex flex-column" height="100%">

              <v-card-title>
                <v-icon left>mdi-cog</v-icon>
                游戏相关设置
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <!--                <v-text-field label="Tickrate" v-model="tickrate"></v-text-field>-->
                  <v-select :items="tickrates" label="Tickrate" v-model="tickrate"></v-select>
                  <v-select :items="gameModes" label="游戏模式" v-model="gameMode"></v-select>
                  <v-select :items="mapGroups" label="地图组选择" v-model="selectedMapGroup"></v-select>
                  <!--                <v-btn color="primary" @click="createConfig">权力配置 - 一键创建</v-btn>-->
                  <!--                <v-text-field label="创意工坊地图 ID" v-model="workshopMapID"></v-text-field>-->
                  <v-checkbox label="板子销毁前5分钟游戏内提醒" v-model="resolutionController"></v-checkbox>
                  <v-checkbox label="开启 Demo 自动录制" v-model="autoDemoControl"></v-checkbox>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>
                <v-icon left>mdi-server</v-icon>
                板子相关设置
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-text-field
                      label="连接密码"
                      hint="请输入板子连接密码，留空则不设置密码"
                      v-model="connectionPassword"
                    ></v-text-field>
                  </v-row>

                  <v-row v-for="(link, index) in adminLinks" :key="index">
                    <v-text-field
                      :label="'您的 Steam 主页链接 ' + (index + 1)"
                      v-model="adminLinks[index]"
                      append-icon="mdi-delete"
                      @click:append="() => removeLink(index)"
                    ></v-text-field>

                  </v-row>
                  <v-btn
                    class="mt-3"
                    color="primary"
                    @click="addLink"
                  >
                    <v-icon left>mdi-account-plus</v-icon>
                    新增管理员
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>


          <v-col cols="12" md="4">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-row>
                <v-col>
                  <v-card-title>
                    <v-icon left>mdi-console-network</v-icon>
                    发送控制台指令
                  </v-card-title>
                </v-col>
                <v-col class="d-flex justify-end">
                  <!--                <v-spacer></v-spacer>-->
                  <v-btn color="primary" @click="refreshServer" class="mr-1">

                    管理脚本
                  </v-btn>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-card-text class="fill-height">
                <v-form>
                  <v-select :items="commands" label="选择要发送的脚本" v-model="selectedCommand"></v-select>
                  <v-textarea label="控制台命令内容" v-model="commandContent"></v-textarea>
                  <v-btn color="primary" @click="sendCommand">
                    <v-icon left>mdi-send</v-icon>
                    发送
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="12" md="7">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-row>
                <v-col>
                  <v-card-title>
                    <v-icon left>mdi-map</v-icon>
                    地图组管理
                  </v-card-title>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="refreshServer" class="mr-1">
                    <v-icon left>mdi-folder-plus</v-icon>
                    地图组
                  </v-btn>

                  <v-btn color="primary" @click="refreshServer" class="ml-1">
                    <v-icon left>mdi-note-plus-outline</v-icon>
                    地图
                  </v-btn>
                </v-col>
              </v-row>

              <!--            <v-card-title>地图组管理</v-card-title>-->

              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <v-select :items="mapGroups" label="地图组选择" v-model="selectedMapGroup"></v-select>
                  <v-divider></v-divider>

                  <v-data-table v-model:search="search" :items="items" :headers="mapTableHeaders"
                                :items-per-page-text="'每页条目:'">
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

                    <template v-slot:item.isCached="{ item }">
                      <div class="text-center">
                        <v-chip
                          :color="item.isCached ? 'green' : 'red'"
                          :text="item.isCached ? '已缓存' : '未缓存'"
                          class="text-uppercase"
                          size="small"
                          label
                        ></v-chip>
                      </div>
                    </template>
                  </v-data-table>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>
                <v-icon left>mdi-account-cowboy-hat</v-icon>
                板子在线用户
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
                  :headers="playerTableHeaders"
                  :items="onlinePlayers"
                  :search="search"
                  :items-per-page-text="'每页条目:'"
                ></v-data-table>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-3 d-flex flex-column" height="100%">
              <v-card-title>比赛数据</v-card-title>
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

const route = useRoute();
const serverId = ref(route.params.id);

const gameTitle = ref('标签面板')
const serverStatus = ref('正常')
const serverStatusClass = ref('text-success')
const serverRegion = ref('华北 | 北京')
const serverIP = ref('192.168.1.1')
const iotId = ref('NEXkBWuB8vHO1ibzcPAdia6600')
const serverMap = ref('Dust2')
const connectionTip = ref('')
const startDateTime = ref('2024/6/1 21:57:22')
const endDateTime = ref('2024/6/1 23:19:27')
const progress = ref(33)
const tickrates = ref(['128', '64'])
const tickrate = ref('128')
const gameModes = ref([
  '第三方匹配 / Matchy 兼容',
  '其他选项'
])
const gameMode = ref('第三方匹配 / Matchy 兼容')
const mapGroups = ref([
  'mg_active',
  'mg_comp',
  'mg_comp_fun',
])
const selectedMapGroup = ref('mg_active')
const resolutionController = ref(false)
const autoDemoControl = ref(false)
const connectionPassword = ref('1s84drt')
const adminLinks = ref([
  'https://steamcommunity.com/id/gsq474742/',
  'https://steamcommunity.com/id/cclyf/',
])
const saveSettings = ref(false)
const plugins = ref(['免费先行'])
const selectedPlugin = ref('免费先行')
const autoSaveLoadPlugins = ref(false)
const commands = ref(['命令1', '命令2'])
const selectedCommand = ref('')
const commandContent = ref('')
const search = ref('')
const playerTableHeaders = ref([
  // { key: 'no', title: '#' , sortable: false },
  {key: 'playerName', title: '玩家名'},
  {key: 'playerScore', title: '分数'},
  {key: 'playerOnlineTime', title: '在线时长'},
  {key: 'playerIP', title: 'IP'},
  {key: 'playerPing', title: '延迟'},
  {key: 'playerSteamID64', title: 'SteamID'},
])

const mapTableHeaders = ref([
  {key: 'name', title: '自定义名称'},
  {key: 'image', title: '预览图'},
  {key: 'id', title: '创意工坊链接'},
  {key: 'size', title: '地图大小'},
  {key: 'rating', title: '评分'},
  {key: 'isCached', title: '是否已缓存'},
  // { key: 'playerSteamID64', title: '64位SteamID' },
])

const onlinePlayers = ref([
  {
    no: 1,
    playerName: 'Player1',
    playerScore: 100,
    playerOnlineTime: '3h45m12s',
    playerIP: '192.168.1.1',
    playerPing: '12ms',
    playerSteamID64: '76561198006409530',
  },
  {
    no: 2,
    playerName: 'Player2',
    playerScore: 90,
    playerOnlineTime: '2h30m15s',
    playerIP: '192.168.1.2',
    playerPing: '25ms',
    playerSteamID64: '76561198006409531',
  },
  {
    no: 3,
    playerName: 'Player3',
    playerScore: 80,
    playerOnlineTime: '1h45m30s',
    playerIP: '192.168.1.3',
    playerPing: '30ms',
    playerSteamID64: '76561198006409532',
  },
  {
    no: 4,
    playerName: 'Player4',
    playerScore: 70,
    playerOnlineTime: '1h15m45s',
    playerIP: '192.168.1.4',
    playerPing: '35ms',
    playerSteamID64: '76561198006409533',
  }
])

const items = ref([
  // { key: 'name', title: '自定义名称'},
  // { key: 'image', title: '预览图' },
  // { key: 'id', title: '创意工坊链接' },
  // { key: 'size', title: '地图大小' },
  // { key: 'rating', title: '评分' },
  // { key: 'isCached', title: '是否已缓存' },
  {
    name: 'Spring House [Hide and Seek]',
    image: 'https://steamuserimages-a.akamaihd.net/ugc/2500140627950113792/4A6FAF3542DF12ED0CFDBF045589A0493748F5FF/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
    id: '3262766299',
    size: '128MB',
    rating: 4.5,
    isCached: false,
  },
  {
    name: 'Inferno',
    image: '2.png',
    id: '内置地图',
    size: '/',
    rating: 5,
    isCached: true,
  },
  {
    name: 'Mirage',
    image: '3.png',
    id: '2528500015',
    size: '128MB',
    rating: 4.8,
    isCached: true,
  },
  {
    name: 'Nuke',
    image: '4.png',
    id: '2528500016',
    size: '126.5MB',
    rating: 4.1,
    isCached: false,
  },

])


let updateInterval = ref<number>();

import * as api from "@/api_client/api";

api.DefaultApiFp

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


const copyIP = () => {
  navigator.clipboard.writeText(serverIP.value)
    .then(() => {
      // 复制成功
      // 弹出vuetify提示复制成功
    })
    .catch((err: any) => {
      // 复制失败
      // 可以处理错误情况
    });
}


const addLink = () => {
  adminLinks.value.push('')
}


const removeLink = (index: number) => {
  adminLinks.value.splice(index, 1)
}

// export default defineComponent({
// data() {
//   return {
//     gameTitle: 'Ruko‘s CS2 板子控制台' as string,
//     serverStatus: '正常' as string,
//     serverStatusClass: 'text-success' as string,
//     serverRegion: '华北 | 北京' as string,
//     serverIP: '192.168.1.1' as string,
//     serverPlayers: '10~11' as string,
//     serverMap: 'Dust2' as string,
//     connectionTip: '' as string,
//     startDateTime: '2024/6/1 21:57:22' as string,
//     endDateTime: '2024/6/1 23:19:27' as string,
//     progress: 0 as number,
//     tickrates: ['128', '64'] as string[],
//     tickrate: '128' as string,
//     gameModes: [
//       '第三方匹配 / Matchy 兼容',
//       '其他选项'
//     ] as string[],
//     gameMode: '第三方匹配 / Matchy 兼容' as string,
//     mapGroups: [
//       'mg_active',
//       'mg_comp',
//       'mg_comp_fun',
//     ] as string[],
//     selectedMapGroup: 'mg_active' as string,
//     resolutionController: false as boolean,
//     autoDemoControl: false as boolean,
//     connectionPassword: '1s84drt' as string,
//     adminLinks: [
//       'https://steamcommunity.com/id/gsq474742/',
//       'https://steamcommunity.com/id/cclyf/',
//     ] as string[],
//     saveSettings: false as boolean,
//     plugins: ['免费先行'] as string[],
//     selectedPlugin: '免费先行' as string,
//     autoSaveLoadPlugins: false as boolean,
//     commands: ['命令1', '命令2'] as string[],
//     selectedCommand: '' as string,
//     commandContent: '' as string,
//     onlineUsers: [] as any[], // 具体类型根据实际情况定义
//     search: '' as string,
//     headers: [
//       { key: 'No', title: '#' },
//       { key: 'playerName', title: '玩家名' },
//       { key: 'playerScore', title: '玩家分数' },
//       { key: 'playerOnlineTime', title: '在线时长' },
//       { key: 'playerIP', title: 'IP' },
//       { key: 'playerPing', title: '延迟' },
//       { key: 'playerSteamID64', title: '64位SteamID' },
//     ] as { key: string, title: string }[],
//     desserts: [
//       {
//         name: 'Frozen Yogurt',
//         calories: 159,
//         fat: 6.0,
//         carbs: 24,
//         protein: 4.0,
//         iron: 1,
//       },
//       {
//         name: 'Ice cream sandwich',
//         calories: 237,
//         fat: 9.0,
//         carbs: 37,
//         protein: 4.3,
//         iron: 1,
//       },
//     ] as { name: string, calories: number, fat: number, carbs: number, protein: number, iron: number }[],
//   };
// },
// methods: {
//   refreshServer(): void {
//     // 刷新板子的逻辑
//   },
//   createConfig(): void {
//     // 创建配置的逻辑
//   },
//   sendCommand(): void {
//     // 发送控制台命令的逻辑
//   },
//   copyIP(): void {
//     navigator.clipboard.writeText(this.serverIP)
//       .then(() => {
//         // 复制成功
//         // 弹出vuetify提示复制成功
//       })
//       .catch((err: any) => {
//         // 复制失败
//         // 可以处理错误情况
//       });
//   },
//   addLink(): void {
//     this.adminLinks.push('');
//   },
//   removeLink(index: number): void {
//     this.adminLinks.splice(index, 1);
//   }
// }
// });
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
