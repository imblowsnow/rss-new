<template>
  <div class="rss-collect-view">
    <div class="rss-view-container">
      <div class="rss-view-header flex">
        <div class="flex flex-1 flex-align-items-center">
<!--          <div class="v-checkbox-dropdown v-tools">-->
<!--            <el-checkbox size="large" ></el-checkbox>-->
<!--            <el-dropdown trigger="click">-->
<!--              <el-icon class="el-icon&#45;&#45;right"><arrow-down /></el-icon>-->
<!--              <template #dropdown>-->
<!--                <el-dropdown-menu>-->
<!--                  <el-dropdown-item>全部</el-dropdown-item>-->
<!--                  <el-dropdown-item>无</el-dropdown-item>-->
<!--                  <el-dropdown-item>已读</el-dropdown-item>-->
<!--                  <el-dropdown-item>未读</el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </template>-->
<!--            </el-dropdown>-->
<!--          </div>-->
          <div class="v-button v-tools" title="刷新" @click="reload">
            <el-icon><RefreshRight /></el-icon>
          </div>
          <div class="v-button v-tools" title="全部删除" @click="deleteArticles">
            <el-icon><Delete  /></el-icon>
          </div>
        </div>
        <div class="flex flex-align-items-center">
          <div class="v-tools">
            <small>第 {{ (current - 1) * page.limit + 1 }} - {{ current * page.limit > total ? total : current * page.limit }} 行
              ，共 {{ total }} 行</small>
          </div>
          <div class="v-button v-tools" title="上一页" @click="loadPrev" :class="{'disabled': current === 1}">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <div class="v-button v-tools" title="下一页" @click="loadNext" :class="{'disabled': (current) * page.limit + 1 > total }">
            <el-icon><ArrowRight /></el-icon>
          </div>
          <div class="v-button v-tools" title="切换视图" @click="toggleView">
            <el-icon><Document /></el-icon>
          </div>
        </div>
      </div>
      <div class="rss-view-body" >
        <template v-if="tableData.length > 0">
          <component ref="rssView"
                     :is="view"
                     :data="tableData"
                     :read="read"
                     @searchByFrom="loadByFrom"
                     :loading="loadTableData">
          </component>
        </template>
        <template v-else>
          <el-empty :image-size="200" description="无数据" />
        </template>
      </div>
    </div>


  </div>
</template>


<script>
import {defineComponent} from "vue";
import RssViewTable from "@/components/rss-view/rss-view-table.vue";
import RssViewGrid from "@/components/rss-view/rss-view-grid.vue";
import RssViewCard from "@/components/rss-view/rss-view-card.vue";
import RssViewList from "@/components/rss-view/rss-view-list.vue";
import {Back} from "@element-plus/icons-vue";
import bus from "@/utils/bus";
import Rss from "@/utils/Rss";
import db from "@/utils/db";
export default {
  name: 'rss-view',
  components: {Back, RssViewList, RssViewGrid, RssViewCard},
  watch: {
    searchWord(){
      this.loadData();
    }
  },
  data() {
    return {
      selected: [],
      tableData: [],
      loadTableData: false,

      searchWord: null,

      // 默认视图
      view: RssViewList.name,
      views: [
        {
          name: RssViewList.name,
          label: '列表视图',
        },
        // {
        //   name: RssViewGrid.name,
        //   label: '格子视图',
        // },
        {
          name: RssViewCard.name,
          label: '卡片视图',
        }
      ],

      current: 1,
      total: 65,
      page: {
        limit: 15,
      },
      searchFrom: null,

      readData: null
    };
  },

  mounted() {
    console.log(RssViewTable.name);
    if (db.getItem(db.KEY_VIEW) != null) {
      this.view = db.getItem(db.KEY_VIEW)
    }

    bus.$on(bus.EVENT_SEARCH, (searchWord) => {
      console.log('bus on collect', bus.EVENT_SEARCH, searchWord);
      this.searchWord = searchWord
    })

    this.loadData()
  },
  methods: {
    toggleView() {
      for (let i = 0; i < this.views.length; i++) {
        if (this.view === this.views[i].name) {
          this.view = this.views[(i + 1) % this.views.length].name
          break
        }
      }

      db.setItem('rss-view', this.view)
    },

    async loadData() {
      let params = {
        page: this.current,
        limit: this.page.limit,
        searchWord: this.searchWord,
        from: this.searchFrom
      }
      console.log('collect loadData', params);
      this.loadTableData = true;
      this.tableData = []

      let data = Rss.getCollectArticles(params)

      console.log('collect loadData', data);

      this.total = data.total;
      this.tableData = data.articles;
      this.loadTableData = false;
    },

    /**
     * 加载更多
     */
    loadTableMore() {
      console.log('loadMore start');
      // this.current++;
      // return this.doLoadData().then((data: any) => {
      //   this.tableData = this.tableData.concat(data);
      // })
    },

    /**
     * 加载下一页
     */
    loadNext() {
      console.log('loadNext start');
      this.current++;
      return this.loadData()
    },
    /**
     * 加载上一页
     */
    loadPrev() {
      console.log('loadPrev start');
      this.current--;
      return this.loadData()
    },

    loadByFrom(from) {
      console.log('searchByFrom', from);
      this.current = 1;
      this.searchFrom = from;
      bus.$emit(bus.EVENT_CHANGE_SEARCH, null)
      // 自动触发
      // this.loadData()
    },

    reload() {
      console.log('reload start');
      return this.loadData()
    },

    read(data) {
      console.log('read start', data);
      localStorage.setItem('rss-read', JSON.stringify(data));
      localStorage.setItem('rss-read-list', JSON.stringify(this.tableData));
      // 跳转到详情页
      this.$router.push({name: 'rss-reader'})
    },

    async deleteArticles() {
      try {
        await this.$confirm("确定删除所有收藏的文章吗？");
      } catch (err) {
        return;
      }
      Rss.deleteCollectArticles()
      this.reload()
    }
  },
};
</script>

<style lang="stylus">
.rss-collect-view {
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
      height: calc(100vh - 100px);
      overflow: auto;


    }
  }
}

</style>
