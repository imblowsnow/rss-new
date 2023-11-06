<template>
  <div class="rss-view-list">
    <div v-for="item in data"
         class="rss-view-list-item" :class="{
      'read-item': item.read,
      'selected-item': item.selected,
    }">
      <div class="from">
        <el-link :underline="false" @click.prevent="searchByFrom(item.from)">
          {{item.from}}
        </el-link>
      </div>
      <div class="content-box" @click="read(item)">
        <el-link class="title" :underline="false">{{item.title}}</el-link>
        <small class="text-ellipsis summary">{{item.description}}</small>
      </div>
      <div class="time" :title="formatDate(item.published)" @click="read(item)">
        <span>{{ timeDistance(item.published) }}</span>
      </div>
    </div>
    <el-skeleton v-if="loading" :count="limit" animated >
      <template #template>
        <div class="rss-view-list-item">
          <div class="from">
            <el-skeleton-item variant="text" />
          </div>
          <div class="content-box">
            <el-skeleton-item variant="text" />
          </div>
          <div class="time">
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import RssViewExtend from "./rss-view-extend.vue";

export default defineComponent({
  name: 'rss-view-list',
  extends: RssViewExtend,
  data() {
    return {

    };
  },
  computed: {},
  mounted() {

  },
  methods: {

  },
});
</script>

<style lang="stylus">
.rss-view-list {
  height: calc(100vh - 100px);
  overflow: auto;

  .rss-view-list-item{
    display flex;
    align-items: center;
    padding: 4px 20px;
    border-bottom 1px solid var(--el-border-color);

    grid-gap: 1em;

    height 40px;
    cursor pointer
    .from{
      width 120px;

      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
      word-break: normal;
      word-wrap: break-word;
    }
    .content-box{
      flex: 1;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .title{
        display: inline-block;
        .el-link__inner{
          font-weight 600
        }
      }
      .summary{
        color: var(--el-text-color-placeholder);
        margin-left: 10px;
      }
    }
    .time{
      width 80px;
    }
  }
  .rss-view-list-item:hover{
    background-color: var(--el-menu-hover-bg-color);
  }
  .rss-view-list-item.read-item{
    background var(--v-theme-background);
  }
}
</style>
