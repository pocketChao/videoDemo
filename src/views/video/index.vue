<template>
  <div class="page">
    <video-player
      :video-url="videoUrl"
      :some-project="inputVideoUrl"
      @ready="ready"
      @play="play"
    ></video-player>
    <div class="file-container" v-if="true">
      <field
        v-model="inputVideoUrl"
        center
        clearable
        label="地址"
        placeholder="请输入视频地址"
      >
        <template #button>
          <Button size="small" type="primary" @click="switchVideoUrl"
            >观看视频</Button
          >
        </template>
      </field>
    </div>
  </div>
</template>

<script>
import { Field, Button } from "vant";
import VideoPlayer from "./video-player/index.vue";
export default {
  name: "VideoPlayPage",
  components: {
    Field,
    Button,
    VideoPlayer
  },
  data() {
    return {
      player: null,
      isLandscape: false,
      inputVideoUrl: "",
      videoUrl:
        "http://saas.g3.chinaedu.net:13691/sfs/mizarsaas/mizar_test/resource/m3u8/20200508/ca872a23-88c2-4e70-980a-5008944b1d22/ca872a23-88c2-4e70-980a-5008944b1d22.m3u8"
    };
  },
  methods: {
    switchVideoUrl() {
      if (!this.inputVideoUrl.trim()) {
        return;
      }
      this.videoUrl = require("@/assets/videos/vertical-test.mp4");
    },
    ready() {
      console.log("==========");
    },
    play() {
      console.log("play+++++++");
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #f1f1f1;
}
</style>
