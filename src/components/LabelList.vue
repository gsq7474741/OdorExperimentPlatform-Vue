<template>
  <v-app>
    <TopBar/>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h2 class="mb-5">标签列表</h2>

            <!-- FIXME: 这里使用如下样式的表格 -->
            <v-data-table :items="servers" :headers="headers" :items-per-page-text="'每页条目:'">
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
// import { defineComponent } from 'vue';
import {ref} from "vue";
import TopBar from "@/components/TopBar.vue";

// export default defineComponent({

// iotId: 'ServerList',
// data() {
//   return {
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

const servers = ref([
  // 示例数据
  {
    labelId: 0,
    labelStr: 'undefined',
    nlDescription: 'null',
    img: 'https://via.placeholder.com/150',
    concentration: 0,
    father: 'system',
    sampleNum: 384,
    dpNum: 665384,
    note: '背景响应',
  },
  {
    labelId: 1,
    labelStr: '香蕉',
    nlDescription: '一个剥开外皮的香蕉',
    img: 'https://via.placeholder.com/150',
    concentration: 4.5,
    father: '水果',
    sampleNum: 3,
    dpNum: 1255,
    note: '备注1',
  },
  {
    labelId: 2,
    labelStr: '苹果',
    nlDescription: '完整的苹果，没有切开',
    img: 'https://via.placeholder.com/150',
    concentration: 1,
    father: '水果',
    sampleNum: 12,
    dpNum: 3456,
    note: '',
  },
  {
    labelId: 3,
    labelStr: '伊利原味酸奶',
    nlDescription: '伊利原味酸奶，小盒装，120ml',
    img: 'https://via.placeholder.com/150',
    concentration: 3.5,
    father: '饮料',
    sampleNum: 5,
    dpNum: 789,
    note: '',
  },
  {
    labelId: 4,
    labelStr: '可口可乐',
    nlDescription: '可口可乐，小瓶装，330ml',
    img: 'https://via.placeholder.com/150',
    concentration: 3,
    father: '饮料',
    sampleNum: 1,
    dpNum: 123,
    note: '',
  },
  {
    labelId: 5,
    labelStr: '雪碧',
    nlDescription: '雪碧，小瓶装，330ml',
    img: 'https://via.placeholder.com/150',
    concentration: 2.5,
    father: '饮料',
    sampleNum: 2,
    dpNum: 456,
    note: '',
  },
  {
    labelId: 6,
    labelStr: '牛奶',
    nlDescription: '牛奶，小瓶装，250ml',
    img: 'https://via.placeholder.com/150',
    concentration: 3,
    father: '饮料',
    sampleNum: 5,
    dpNum: 789,
    note: '',
  },


])
//   };
// },
// });
</script>

<style scoped>

</style>
