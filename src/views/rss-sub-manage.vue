<template>
  <div class="rss-sub-manage flex">
    <div class="left">
      <el-table
          class="rss-table-body"
          :data="data"
          :show-header="false"
          highlight-current-row
          @row-click="onRowClick"
          style="width: 100%"
      >
        <el-table-column prop="name" label="来源">
          <template v-slot:default="scope">
            <div>{{ scope.row.name }}</div>
            <div>{{ scope.row.url }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right" v-if="currentData != null">
      <el-card shadow="never">
          <el-form ref="form" :model="currentData" label-width="80px">
            <el-form-item label="来源名称">
              <el-input v-model="currentData.name"></el-input>
            </el-form-item>
            <el-form-item label="站点图标">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="currentData.icon"></el-image>
            </el-form-item>
            <el-form-item label="站点名称">
              <el-input v-model="currentData.title" disabled></el-input>
            </el-form-item>
            <el-form-item label="订阅地址">
              <el-input v-model="currentData.url" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSubscribe">保存</el-button>
              <el-button type="danger" @click="unSubscribe">取消订阅</el-button>
            </el-form-item>
          </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Rss from "@/utils/rss";
export default {
  name: 'rss-sub-manage',
  data() {
    return {
      data: [],
      currentData: null
    };
  },
  computed: {},
  mounted() {
    this.data = Rss.getSubscribes();
  },
  methods: {
    onRowClick(row, column, event) {
      let id = row.id;
      this.currentData = row;
      console.log('click Subscribe',row, column, event);
    },

    saveSubscribe() {
      try {
        Rss.saveSubscribe(this.currentData);
      }catch (err){
        this.$message.error("保存订阅失败");
        return;
      }
      this.$message.success("保存订阅成功");
    },
    async unSubscribe(){
      try {
        await this.$confirm("确定取消订阅吗？");
      }catch (err){
        return;
      }
      Rss.unsubscribe(this.currentData.id);

      this.data = Rss.getSubscribes();
      this.currentData = null;
    }
  },
};
</script>

<style lang="stylus">
.rss-sub-manage {
  grid-gap 1em;
  .left{
    width 300px
  }
  .right{
    flex 1
  }
}
</style>
