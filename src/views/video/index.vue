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
      videoData: {
        localMp4Url: require("@/assets/videos/vertical-test.mp4"),
        mp4Url:
          "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        m3u8Url:
          "http://saas.g3.chinaedu.net:13691/sfs/lms3/uploadfile//30003//20200422/2a990dfd-297f-493d-b1a2-634e4b10cca3.mp4"
      },
      videoUrl: ""
    };
  },
  created() {
    this.videoUrl = this.videoData.m3u8Url;
  },
  methods: {
    switchVideoUrl() {
      if (!this.inputVideoUrl.trim()) {
        return;
      }
      this.videoUrl = this.videoData.localMp4Url;
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
