<template>
  <el-container class="v-container">
    <el-header class="v-page-header">
      <div class="v-page-header-left">
        <div class="v-button" @click="toggleMenu">
          <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </div>
        <div  class="logo-warp flex flex-align-items-center">
          <el-icon style="height: 36px; margin-right: 5px;" class="logo">
            <svg t="1699092016746" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="6455" width="200" height="200">
              <path
                  d="M160.768 702.464q33.792 0 62.976 12.8t50.688 34.816 34.304 51.2 12.8 61.952q0 33.792-12.8 62.976t-34.304 50.688-50.688 34.304-62.976 12.8q-32.768 0-61.952-12.8t-51.2-34.304-34.816-50.688-12.8-62.976q0-32.768 12.8-61.952t34.816-51.2 51.2-34.816 61.952-12.8zM66.56 377.856q119.808 0 225.792 45.568t184.32 124.416 123.904 184.832 45.568 225.792l-89.088 0q-44.032 0-83.968-1.024 0-83.968-31.744-158.208t-87.04-129.536-129.536-87.04-158.208-31.744l0-173.056zM67.584 68.608q122.88 0 236.544 31.744t212.48 89.6 179.712 139.264 138.752 180.224 89.6 211.968 31.744 236.032l-59.392 0-36.864 0q-16.384 0-30.208-0.512t-32.256-0.512q0-100.352-26.112-194.048t-73.728-174.592-114.176-147.456-147.456-113.664-174.08-73.216-193.536-26.112l0-32.768q0-24.576-0.512-50.688t-0.512-47.616l0-27.648z"
                  p-id="6456"></path>
            </svg>
          </el-icon>
          <!--          <img style="height: 36px; margin-right: 5px;"  class="logo" src="https://webfollow.cc/logo.svg" alt="">-->
          <span style="    font-size: 14px;font-weight: 600;">RSS订阅</span>
        </div>
      </div>
      <div class="v-page-header-center flex flex-align-items-center">
        <div class="search-warp flex flex-align-items-center">
          <el-input placeholder="搜索标题" v-model="searchWord">
            <template v-slot:prefix="scopre">
              <el-button style="font-size: 20px;" :icon="Search" text circle />
            </template>
          </el-input>
        </div>
      </div>
      <div class="v-page-header-right">

      </div>
    </el-header>
    <el-container class="v-container-main">
      <el-aside :class="'v-container-left' + ' v-container-left-' + menuMode">
        <div style="padding: 10px;">
          <el-button v-if="menuMode === 'default'" class="v-btn-sub" type="primary" @click="goAddView">
            <template v-slot:icon>
              <svg style="transform: scale(1.5);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" stroke-width="10" /></svg>
            </template>
            添加订阅
          </el-button>
          <el-button v-else class="v-btn-sub" type="primary" @click="goAddView">
            <template v-slot:icon>
              <svg style="transform: scale(1.5);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            </template>
          </el-button>
        </div>
        <el-menu
            ref="menu"
            :default-active="activeMenu"
            @select="selectMenu"
            :collapse="menuMode === 'min'"
            router
        >
          <el-menu-item index="home" route="/">
            <el-icon><MessageBox /></el-icon>
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>
          <!--          <el-menu-item index="collect" route="/rss-collect">-->
          <!--            <el-icon><Star /></el-icon>-->
          <!--            <template #title>收藏</template>-->
          <!--          </el-menu-item>-->
          <el-menu-item index="find" route="/rss-sub-manage">
            <el-icon><Compass /></el-icon>
            <template #title>我的订阅</template>
          </el-menu-item>
          <el-menu-item index="config" route="/setting">
            <el-icon><Setting /></el-icon>
            <template #title>配置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="v-main">
          <div class="v-main-table">
            <router-view></router-view>
            <!--            <rss-view :searchWord="searchWord" v-model:search-word="searchWord" v-if="view === 'view'"></rss-view>-->
            <!--            <rss-add v-if="view === 'view-add'" @back="selectMenu('home')"></rss-add>-->
            <!--            <rss-sub-manage v-if="view === 'view-sub-manage'" @back="selectMenu('home')"></rss-sub-manage>-->
          </div>
        </el-main>
        <!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script >
import bus from "@/utils/bus";
import Rss from "@/utils/Rss";

export default {
  components: {

  },
  data(){
    return {
      // default 默认全部大小
      // min 最小只显示图标
      // none 手机下不显示
      menuMode: 'default',
      activeMenu: 'home',
      // 显示的视图
      view: 'view',

      searchWord: null
    }
  },
  mounted() {
    // 检查浏览器宽度是否为手机
    if (window.innerWidth < 810) {
      this.menuMode = 'min'
    }


    bus.$on(bus.EVENT_NEW_ARTICLE, (articles) => {
      console.log('bus on app', bus.EVENT_NEW_ARTICLE, articles);

      let isNotify = Rss.getConfig('notify', false)
      if (isNotify && articles.length > 0) {
        this.$notify({
          title: '新文章',
          message: '已更新' + articles.length + '篇文章',
          type: 'success',
        });
      }
    })
  },
  methods:{
    toggleMenu(){
      if(this.menuMode === 'none'){
        // 弹出左侧抽屉
      }else {
        if(this.menuMode === 'default'){
          this.menuMode = 'min'
        }else if(this.menuMode === 'min'){
          this.menuMode = 'default'
        }
      }
    },
    selectMenu(index){
      if (index === 'find') {
        this.activeMenu = index
        this.view = 'view-sub-manage'
      }else{
        this.activeMenu = index
        this.view = 'view'
      }
    },
    tableRowClassName({row, rowIndex}){
      if (row.selected) {
        return 'selected-row'
      }else if (row.unread) {
        return 'unread-row'
      }
      return ''
    },

    goAddView(){
      console.log('goAddView');
      this.activeMenu = null
      this.$router.push('/rss-add')
    }
  }
};
</script>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import {Search, Plus, Setting} from '@element-plus/icons-vue'
// import RssView from "@/components/rss-view/rss-view.vue";
// import RssAdd from "@/components/rss-add.vue";
// import RssSubManage from "@/components/rss-sub-manage.vue";

</script>

<style lang="stylus">
.v-container{
  height 100vh
  background var(--v-theme-background)
}
.v-container-main{
  height: calc(100vh - 60px);
}
.v-page-header {
  padding: 0;
  height: var(--el-header-height);
  display: flex;
  //border-bottom: 1px solid var(--el-border-color);
  .v-page-header-left{
    width 300px;
    height: var(--el-header-height);
    display: flex;
    align-items: center;

    padding-left 20px;
  }
  .v-page-header-center{
    flex: 1 1;
    .search-warp .el-input{
      width: 800px;
      max-width: calc(100vw - 300px - 200px);
      height: calc(var(--el-header-height) - 10px)
      padding: 3px 0;
      .el-input__wrapper{
        border-radius 50px
      }
    }
  }
}
.v-button{
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  padding: 8px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  line-height: 0;
  svg{
    fill: currentColor;
    color: #5f6368;
    opacity: 1;

    height: 24px;
    width: 24px;
  }
}
.v-button:hover {
  background-color: var(--el-border-color-hover);
  outline: none;
}
.v-button.disabled{
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}
.v-container-left{
  //border-right: 1px solid var(--el-border-color);
  transition: width .2s;
  padding-right 10px
  .el-menu{
    border-right: unset;
    --el-menu-item-height: 40px;
    --el-menu-bg-color: var(--v-theme-background);
    .el-menu-item.is-active , .el-menu-item.is-active *{
      font-weight: bold;
    }
  }

  .v-btn-sub{
    border-radius: 20px;
    padding: 25px;
    margin: 10px 0;
  }
}
.v-container-left.v-container-left-default{
  --el-aside-width: 300px;
  .el-menu-item.is-active{
    background-color: var(--v-theme-primary);
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
}
.v-container-left.v-container-left-min{
  --el-aside-width: 85px;
  .el-menu{
    width: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .el-menu-item{
    margin: 0 var(--el-menu-base-level-padding);
    width: var(--el-menu-item-height);
    height: var(--el-menu-item-height);
    .el-menu-tooltip__trigger{
      padding: 0;
      display: flex;
      justify-content: center;
    }
  }
  .el-menu-item.is-active{
    background-color: var(--v-theme-primary);
    border-radius: 50%;
  }
}

.v-main{
  padding 0
  border-radius: 15px;
}

.v-checkbox-dropdown{
  display: flex;
  align-items: center;
}


</style>
