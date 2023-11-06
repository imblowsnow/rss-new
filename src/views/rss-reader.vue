<template>
  <div class="rss-reader" style="padding: 0 20px;">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="article-info flex flex-justify-content-between flex-align-items-center" >
      <div class="author flex" style="grid-gap: 1em;">
        <img class="icon" :src="getFromLogo(data.fromId)" style="width: 40px;height: 40px;"
             :title="data.from">
        <div>
          <div class="channel-info flex" style="font-size: 14px;">
            <span style="font-weight: 700;">{{ data.from }}</span>
            <div>
              （ {{ data.link }} ）
            </div>
          </div>
          <div>
            <el-tag v-if="data.author">{{ data.author }}</el-tag>
<!--            标签-->
            <el-tag v-for="tag in data.category">{{ tag }}</el-tag>
          </div>
        </div>
      </div>
      <div class="action">
        <small>{{ formatDate(data.published) }}</small
        >
        <div class="v-button" title="收藏">
          <el-icon><Star /></el-icon>
        </div>
        <div class="v-button" title="内嵌网页" @click="toggleIframe">
          <el-icon><ScaleToOriginal /></el-icon>
        </div>
        <div class="v-button" title="打开源文" @click="openToBrowser">
          <el-icon><ChromeFilled /></el-icon>
        </div>
      </div>
    </div>
    <div v-if="isIframe === false" class="content flex-1" v-html="data.content"></div>
    <div class="flex-1" v-else>
      <iframe :src="data.link" style="width: 100%;height: 100%;border: none;"></iframe>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import DateUtil from "@/utils/DateUtil";
import Rss from "@/utils/Rss";

export default defineComponent({
  name: 'rss-reader',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isIframe: false
    };
  },
  computed: {},
  mounted() {
    if (!this.data.content){
      this.toggleIframe()
    }
  },
  methods: {
    toggleIframe(){
      this.isIframe = !this.isIframe
    },
    openToBrowser(){
      // 浏览器打开
      if (window['utools']){
        utools.shellOpenExternal(this.data.link)
      }else{
        window.open(this.data.link)
      }
    },


    timeDistance(date) {
      return DateUtil.timeDistance(date);
    },
    formatDate(date) {
      return DateUtil.formatDate(date);
    },
    getFromLogo(fromId){
      let subscribe = Rss.getSubscribe(fromId)
      if (subscribe) return subscribe.icon;
      return './logo.png'
    }
  },
});
</script>

<style lang="stylus">
.rss-reader {
  height: 100%;
  overflow: hidden;
  display flex
  flex-direction column
  .title {
    padding-bottom: 8px;
    font-size: 1.375rem;
    font-weight: 500;
  }
  .content{
    overflow: auto;
  }
}
</style>
