<template>
  <div class="rss-view-card">
    <el-row style="width: 100%;">
      <el-col v-for="item in data" :span="8" :md="6" :xs="8" style="padding: 0.5em;">
        <el-card  class="article" :body-style="{ padding: '0px' }" @click="read(item)">
          <el-image style="height: 180px;width: 100%;"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    fit="cover" >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div style="padding: 14px">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="info">
              <div class="info-left">
                <img class="icon" :src="getFromLogo(item.fromId)" :title="item.from">
                <el-link :underline="false" class="from">{{ item.from }}</el-link>
              </div>
              <div class="info-right" :title="formatDate(item.published)">
                {{ timeDistance(item.published) }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-skeleton v-if="loading"  animated >
      <template #template>
        <el-row style="width: 100%;">
          <el-col v-for="item in limit" :span="8" :md="6" :xs="8" style="padding: 0.5em;">
            <el-card class="article" :body-style="{ padding: '0px' }">
              <el-skeleton-item style="height: 180px;width: 100%;" variant="image" />
              <div style="padding: 14px">
                <div class="title">
                  <el-skeleton-item variant="text" />
                </div>
                <el-skeleton-item variant="text" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import RssViewExtend from "./rss-view-extend.vue";

export default {
  name: 'rss-view-card',
  extends: RssViewExtend,
  data() {
    return {};
  },
  computed: {},
  mounted() {

  },
  methods: {},
};
</script>

<style lang="stylus">
.rss-view-card {
  display: flex;
  flex-wrap: wrap;
  padding 10px;
  grid-gap: 1em;

  .article{
    flex: 0 0 calc((100% / 4) - 1em);
    margin-bottom .5em
    cursor pointer
    .logo{
      object-fit: cover;
    }
    .title{
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
      word-break: normal;
      word-wrap: break-word;
    }
    .info{
      display flex
      justify-content: space-between;
      align-items: center;
      margin-top 5px
      font-size: 0.8em;
      .icon{
        width: 1.6em;
        height: 1.6em;
      }
      .from{
        margin-left 5px
        font-size: 0.8em;
      }
      .info-left{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
