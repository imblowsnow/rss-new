<template>
  <div class="setting">
    <el-card :body-style="{'padding': 0}" shadow="never">
      <div class="header">
        <div class="title">
          RSS订阅配置
        </div>
        <el-menu
            :default-active="activeName"
            mode="horizontal"
            @select="(index) => activeName = index"
        >
          <el-menu-item index="basic">
            <el-icon>
              <Setting></Setting>
            </el-icon>
            <span>基础配置</span>
          </el-menu-item>
          <el-menu-item index="rss">
            <el-icon>
              <svg t="1699092016746" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="6455" width="200" height="200">
                <path
                    d="M160.768 702.464q33.792 0 62.976 12.8t50.688 34.816 34.304 51.2 12.8 61.952q0 33.792-12.8 62.976t-34.304 50.688-50.688 34.304-62.976 12.8q-32.768 0-61.952-12.8t-51.2-34.304-34.816-50.688-12.8-62.976q0-32.768 12.8-61.952t34.816-51.2 51.2-34.816 61.952-12.8zM66.56 377.856q119.808 0 225.792 45.568t184.32 124.416 123.904 184.832 45.568 225.792l-89.088 0q-44.032 0-83.968-1.024 0-83.968-31.744-158.208t-87.04-129.536-129.536-87.04-158.208-31.744l0-173.056zM67.584 68.608q122.88 0 236.544 31.744t212.48 89.6 179.712 139.264 138.752 180.224 89.6 211.968 31.744 236.032l-59.392 0-36.864 0q-16.384 0-30.208-0.512t-32.256-0.512q0-100.352-26.112-194.048t-73.728-174.592-114.176-147.456-147.456-113.664-174.08-73.216-193.536-26.112l0-32.768q0-24.576-0.512-50.688t-0.512-47.616l0-27.648z"
                    p-id="6456"></path>
              </svg>
            </el-icon>
            <span>订阅配置</span>
          </el-menu-item>
          <el-menu-item index="network">
            <el-icon>
              <svg t="1699185078367" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="5386" width="200" height="200">
                <path
                    d="M909.989 343.281c-21.76-51.446-52.904-97.643-92.568-137.307-39.663-39.664-85.86-70.808-137.306-92.568-53.28-22.536-109.858-33.962-168.164-33.962S397.067 90.87 343.787 113.406c-51.446 21.76-97.643 52.904-137.307 92.568-39.664 39.664-70.808 85.86-92.568 137.307-22.536 53.28-33.962 109.858-33.962 168.164s11.426 114.884 33.962 168.164c21.76 51.445 52.904 97.643 92.568 137.306 39.664 39.664 85.86 70.809 137.307 92.568 53.28 22.535 109.858 33.962 168.164 33.962s114.884-11.427 168.164-33.962c51.445-21.76 97.643-52.904 137.306-92.568 39.664-39.663 70.809-85.86 92.568-137.306 22.535-53.28 33.962-109.858 33.962-168.164s-11.427-114.884-33.962-168.164zM543.951 376.03c17.57-0.243 35.095-0.683 52.536-1.368a1990.762 1990.762 0 0 0 91.131-5.678c10.157 34.378 16.643 71.314 19.389 110.46H543.951V376.03z m0-64.069V163.41c17.617 12.176 39.372 29.845 61.074 54.197 23.42 26.28 43.109 56.138 58.784 89.019-41.937 3.147-82.117 4.783-119.858 5.335z m-64-144.763v144.705a2038.572 2038.572 0 0 1-103.41-4.309 1929.6 1929.6 0 0 1-11.183-0.786c15.195-31.915 34.175-60.991 56.676-86.711 20.284-23.185 40.722-40.49 57.917-52.899zM370.842 371.354a2124.301 2124.301 0 0 0 109.109 4.606v103.484H322.25c2.742-39.079 9.208-75.96 19.335-110.285 9.453 0.776 19.21 1.512 29.257 2.195z m-112.731 108.09H145.342c3.916-45.757 16.208-89.778 36.139-130.276 20.257 3.578 52.836 8.759 95.407 13.641-9.902 36.699-16.182 75.682-18.777 116.635z m-0.859 64c1.975 39.144 9.712 78.242 23.101 116.799-44.093 4.976-77.797 10.319-98.621 13.992-20.08-40.64-32.458-84.841-36.39-130.792h111.91z m64.098 0h158.601v104.048c-36.37 0.602-72.818 2.13-109.109 4.601-8.41 0.573-16.612 1.182-24.609 1.821-14.322-36.523-22.659-73.543-24.883-110.47z m158.601 168.103v131.712c-16.974-15.877-36.574-35.962-56.038-59.735-18.064-22.064-33.892-44.698-47.379-67.668a2038.38 2038.38 0 0 1 103.417-4.309z m64 136.665V711.487c34.387 0.503 70.782 1.903 108.68 4.527-13.467 22.915-29.263 45.496-47.286 67.509-21.547 26.32-43.262 48.119-61.394 64.689z m52.536-199.426a2063.187 2063.187 0 0 0-52.536-1.384V543.444h163.958c-2.227 36.975-10.582 74.045-24.939 110.615a1994.972 1994.972 0 0 0-86.483-5.273z m175.521-105.342H878.56c-3.928 45.898-16.283 90.051-36.322 130.652a1822.84 1822.84 0 0 0-93.476-13.439c13.478-38.691 21.264-77.929 23.246-117.213z m-0.859-64c-2.605-41.111-8.924-80.238-18.891-117.061a1821.491 1821.491 0 0 0 90.233-13.075c19.89 40.46 32.158 84.432 36.07 130.136H771.149z m1.017-228.215a373.188 373.188 0 0 1 34.046 39.155 1772.853 1772.853 0 0 1-75.117 9.98c-19.529-46.785-45.825-88.91-78.291-125.338a423.863 423.863 0 0 0-5.386-5.927c46.185 18.263 88.573 45.955 124.748 82.13zM384.81 165.923a420.788 420.788 0 0 0-8.355 9.102c-32.552 36.525-58.904 78.775-78.449 125.71-32.357-3.484-59.48-7.244-80.226-10.469a373.386 373.386 0 0 1 33.956-39.037c38.338-38.338 83.654-67.152 133.074-85.306zM251.736 771.659a373.444 373.444 0 0 1-33.584-38.548c22.526-3.498 52.529-7.614 88.626-11.328 18.229 35.542 41.31 70.356 68.867 103.808a678.068 678.068 0 0 0 35.727 39.995c-59.757-16.875-114.524-48.814-159.636-93.927z m368.249 91.745a677.032 677.032 0 0 0 33.629-37.814c27.469-33.344 50.487-68.043 68.689-103.466a1780.315 1780.315 0 0 1 83.528 10.88 373.34 373.34 0 0 1-33.665 38.654c-43.23 43.232-95.324 74.373-152.181 91.746z"
                    fill="" p-id="5387"></path>
              </svg>
            </el-icon>
            <span>网络配置</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-card>
    <el-card style="margin-top: 10px;" :body-style="{'padding': 0}" shadow="never">
      <div class="header">
        <el-form ref="form" :model="form" label-width="100px" label-position="top">
          <template v-if="activeName === 'basic'">
            <el-form-item label="监听周期(秒)">
              <el-input-number v-model="form.timer" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="最大文章容量">
              <el-input-number v-model="form.maxArticleNum" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="订阅通知">
              <el-checkbox v-model="form.notify" label="开启订阅通知"/>
            </el-form-item>
            <el-form-item label="自动刷新">
              <el-checkbox v-model="form.autoRefresh" label="开启自动刷新"/>
            </el-form-item>
          </template>
          <template v-else-if="activeName === 'rss'">
            <el-form-item
                label="rsshub地址: 国内地址：https://rss.feiyuyu.net  https://rsshub.rssforever.com">
              <el-input v-model="form.rsshub" ></el-input>
            </el-form-item>
          </template>
          <template v-else-if="activeName === 'network'">
            <el-form-item label="HTTP代理地址(http://127.0.0.1:8888)，为空不代理">
              <el-input v-model="form.proxy" ></el-input>
            </el-form-item>
          </template>
          <el-button style="width: 100%;margin: 20px 0;" type="primary" @click="saveConfig">保存
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import db from "@/utils/db";
import Rss from "@/utils/Rss";

export default {
  name: 'setting',
  data() {
    return {
      activeName: 'basic',
      form: {
        timer: 5,
        maxArticleNum: 5000,
        notify: false,
        rsshub: 'https://rsshub.rssforever.com',
        proxy: null,
        autoRefresh: false
      }
    };
  },
  computed: {},
  mounted() {
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      let configStr = await db.getItem(db.KEY_CONFIG);
      console.log('configStr', configStr);
      if (configStr) {
        let data = JSON.parse(configStr);
        this.form = Object.assign(this.form, data);
      }
    },
    saveConfig() {
      db.setItem(db.KEY_CONFIG, JSON.stringify(this.form));

      Rss.cronInterval();

      this.$message({
        message: '保存成功',
        type: 'success'
      });
    },
  },
};
</script>

<style lang="stylus">
.setting {
  .header {
    padding: 20px 20px 0 20px;

    .el-tabs__header {
      margin: 0;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 500;
      hyphens: auto;
      letter-spacing: .0125em;
      min-width: 0;
      overflow-wrap: normal;
      overflow: hidden;
      padding: 0.5rem 0rem;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
      word-break: normal;
      word-wrap: break-word;
    }

    .sub-title {
      font-size: .875rem;
      font-weight: 400;
      letter-spacing: .0178571429em;
      overflow: hidden;
      padding: 0.5rem 0rem;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
    }
  }

}
</style>
