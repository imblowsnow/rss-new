<template>
  <el-image class="site-icon" :src="icon"></el-image>
</template>

<script>
import Rss from "@/utils/Rss";

export default {
  name: "site-icon",
  props: {
    fromId: null
  },
  data() {
    return {
      icon: null,
      iconFail: null
    }
  },
  watch: {
    fromId() {
      this.getIcon();
    }
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    getIcon() {
      let subscribe = Rss.getSubscribe(this.fromId);
      console.log(this.fromId, subscribe);
      this.icon = subscribe && subscribe.icon ? subscribe.icon : null
      // 获取网站图标
      let host = new URL(subscribe.url).host;
      this.iconFail = `https://statistical-apricot-seahorse.faviconkit.com/${host}/256`
      if (!this.icon) this.icon = this.iconFail
      console.log('icon', this.icon, this.iconFail);
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
