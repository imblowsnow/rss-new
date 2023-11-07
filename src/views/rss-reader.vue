<template>
  <div v-if="readData.title" class="rss-reader">
    <div class="rss-view-container">
      <div class="rss-view-header flex">
        <div class="flex flex-1 flex-align-items-center">
          <div class="v-button v-tools" title="返回" @click="closeRead">
            <el-icon><back /></el-icon>
          </div>
<!--          <div class="v-button v-tools" title="刷新" @click="reload">-->
<!--            <el-icon><RefreshRight /></el-icon>-->
<!--          </div>-->
        </div>
        <div class="flex flex-align-items-center">
          <div class="v-button v-tools" title="上一个" @click="doPrevRead" :class="{'disabled': prevRead === null}">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <div class="v-button v-tools" title="下一个" @click="doNextRead" :class="{'disabled': nextRead === null }">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
      <div class="rss-view-body" >
        <div class="title">
          {{ readData.title }}
        </div>
        <div class="article-info flex flex-justify-content-between flex-align-items-center" >
          <div class="author flex" style="grid-gap: 1em;">
            <site-icon :from-id="readData.fromId" style="width: 40px;height: 40px;"></site-icon>
            <div>
              <div class="channel-info flex" style="font-size: 14px;">
                <span style="font-weight: 700;">{{ readData.from }}</span>
              </div>
              <div>
                <el-tag v-if="readData.author">{{ readData.author }}</el-tag>
                <!--            标签-->
                <el-tag v-for="tag in readData.category">{{ tag }}</el-tag>
              </div>
            </div>
          </div>
          <div class="action">
            <small>{{ formatDate(readData.published) }}</small
            >
            <div class="v-button" title="收藏" @click="collectArticle">
              <el-icon v-if="isCollect"><StarFilled /></el-icon>
              <el-icon v-else><Star /></el-icon>
            </div>
            <div class="v-button" title="内嵌网页" @click="toggleIframe">
              <el-icon><ScaleToOriginal /></el-icon>
            </div>
            <div class="v-button" title="打开源文" @click="openToBrowser(readData.link)">
              <el-icon><ChromeFilled /></el-icon>
            </div>
          </div>
        </div>
        <div v-if="isIframe === false" class="content flex-1" v-html="readData.content || this.readData.description"></div>
        <div class="flex-1" v-else>
          <iframe :src="readData.link" style="width: 100%;min-height: calc(100vh - 185px);border: none;"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import DateUtil from "@/utils/DateUtil";
import Rss from "@/utils/Rss";
import SiteIcon from "@/components/site-icon.vue";

export default {
  name: 'rss-reader',
  components: {SiteIcon},
  data() {
    return {
      tableData: [],
      readData: {},
      isIframe: false,
      isCollect: false
    };
  },
  computed: {
    prevRead(){
      if (this.readData == null) return false;
      if (this.tableData.length === 0) return null;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].link === this.readData.link) {
          if (i === 0) return null;
          return this.tableData[i - 1];
        }
      }
      return null;
    },
    nextRead() {
      if (this.readData == null) return null;
      if (this.tableData.length === 0) return null;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].link === this.readData.link) {
          if (i === this.tableData.length - 1) return null;
          return this.tableData[i + 1];
        }
      }
      return null;
    }
  },
  mounted() {
    let rssReadData = localStorage.getItem('rss-read');
    if (!rssReadData) {
      this.$router.push({path: '/'})
      return;
    }
    this.readData = JSON.parse(rssReadData)

    this.isCollect = Rss.isCollectArticle(this.readData.link);


    this.tableData = localStorage.getItem('rss-read-list') ? JSON.parse(localStorage.getItem('rss-read-list')) : []

    this.$nextTick(() => {
      // 监听a标签点击事件
      document.querySelector('.rss-view-body').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          let href = e.target.getAttribute('href');
          this.openToBrowser(href)
        }
      })
    })
    console.log('readData', this.readData);
  },
  methods: {
    toggleIframe(){
      this.isIframe = !this.isIframe
    },
    openToBrowser(url){
      // 浏览器打开
      if (window['utools']){
        utools.shellOpenExternal(url)
      }else{
        window.open(url)
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
      console.log('get subscribe', subscribe);
      return subscribe && subscribe.icon ? subscribe.icon : './logo.png'
    },


    closeRead() {
      this.$router.back();
    },
    doPrevRead() {
      this.readData = this.prevRead;
      this.isCollect = Rss.isCollectArticle(this.readData.link);
    },
    doNextRead(){
      console.log('doNextRead', this.nextRead);
      this.readData = this.nextRead;
      this.isCollect = Rss.isCollectArticle(this.readData.link);
    },


    async collectArticle(){
      await Rss.collectArticle(this.readData, !this.isCollect)

      this.isCollect = !this.isCollect;

      this.$message({
        message: this.isCollect ? '收藏成功' : '取消收藏成功',
        type: 'success'
      });
    }
  },
};
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

  .rss-view-container{
    background var(--el-bg-color);
    .rss-view-header{
      padding: 0 10px;
      height: 40px;
      .v-tools{
        margin-right: 10px;
        cursor pointer
      }
    }
    .rss-view-body{
      padding 0 20px;
      height: calc(100vh - 100px);
      overflow: auto;

      .content {
        img, iframe {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
