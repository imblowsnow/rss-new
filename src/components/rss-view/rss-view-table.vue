<template>
  <div class="rss-view-table">
    <el-table
        class="rss-table-body"
        :data="data"
        :show-header="false"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-click="onRowClick"
    >
      <el-table-column prop="from" label="来源" width="150" >
        <template v-slot:default="scope">
          <el-link @click="searchByFrom(scope.row.from)" :underline="false" style="display: inline-block;width: 150px;">{{scope.row.from}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" >
        <template  v-slot:default="scope">
          <div class="flex flex-align-items-center">
            <el-link :underline="false" style="display: inline-block;">{{scope.row.title}}</el-link>
            <small class="text-ellipsis summary" style="max-width: 600px; display: inline-block;color: var(--el-text-color-placeholder);margin-left: 20px;">{{scope.row.desc}}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="150"/>
    </el-table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'rss-view-table',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {

  },
  methods: {
    tableRowClassName({row, rowIndex}){
      if (row.selected) {
        return 'selected-row'
      }else if (row.read) {
        return 'read-row'
      }
      return ''
    },

    onRowClick(row, column, cell, event){
      // 跳过第一列点击事件
      if (column.no === 0) return;
      console.log(row, column, cell, event);
    },
  },
});
</script>

<style lang="stylus">
.rss-view-table {

  .el-table__row{
    cursor pointer
  }
  .selected-row{
    background var(--v-theme-primary);
  }
  .read-row{
    background var(--v-theme-background);
  }
}
</style>
