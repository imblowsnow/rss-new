<template>
  <div class="rss-view-grid">
    <div v-for="item in data" class="article">
      <img class="icon" src="https://www.v2ex.com/static/favicon.ico" title="V2EX" alt="">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="time" :title="formatDate(item.time)">
        {{ timeDistance(item.time) }}
      </div>
    </div>
    <el-skeleton v-if="loading"  animated >
      <template #template>
        <div class="rss-view-grid">
          <div v-for="i in limit" class="article">
            <div>
              <el-skeleton-item class="icon" variant="image" />
            </div>
            <div class="title">
              <el-skeleton-item variant="text" />
            </div>
            <div class="time">
              <el-skeleton-item variant="text" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import RssViewExtend from "./rss-view-extend.vue";

export default defineComponent({
  name: 'rss-view-grid',
  extends: RssViewExtend,
  data() {
    return {
      limit: 40,
    };
  },
  computed: {},
  mounted() {

  },
  methods: {},
});
</script>

<style lang="stylus">
.rss-view-grid {
  display: flex;
  flex-wrap: wrap;
  padding 10px;
  grid-gap: 1em;

  .article{
    display: grid;
    grid-template-columns: 1.2em 1fr 50px;
    grid-gap: 1em;
    flex: 0 0 calc((100% / 4) - 1em);
    margin-bottom .5em
    align-items: center;
    padding 10px 0;

    font-size: .85em;
    .icon{
      height: 1.2em;
      width: 1.2em;
      filter: grayscale(50%);
    }
    .title{
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .article:hover{
    background-color: var(--el-menu-hover-bg-color);
  }
}
</style>
