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
    <APlayer></APlayer>
    <div class="" style="width: 100%; height: 1000px; background: red"></div>
  </div>
</template>

<script>
import { Field, Button } from "vant";
import VideoPlayer from "./video-player/index.vue";
import APlayer from "./audio-player/index.vue";
export default {
  name: "VideoPlayPage",
  components: {
    Field,
    Button,
    VideoPlayer,
    APlayer
  },
  data() {
    return {
      player: null,
      isLandscape: false,
      inputVideoUrl: "",
      videoData: {
        localMp4Url: require("@/assets/videos/bird.mp3"),
        mp4Url:
          "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        m3u8Url:
          "http://wxtest.chinaedu.com/cstoreprovider/resource/5265901e-a309-4190-bac4-d8ce86b6c54e/videoType/2/video.m3u8?token=eyJpZCI6ImVhNGUyYjYwLTMwY2ItNGIyZC1iYzdhLWVjZDI0M2ZkYWY5ZCIsImFpdCI6MTYwMTI3OTQ2MjQzMywiZXhwIjoxNjAxMzE1NDYyNDMzLCJyZWZlcmVycyI6IioiLCJ0ZW5hbnRDb2RlIjoibWl6YXJfdGVzdCJ9%7c0c6f0d99793966ca69d05d089fe4e877702a986dcfac92a63830b06b6013a4d2&userId=205b90f6-ec64-49c1-960c-16b843936936",
        m3u82Url:
          "http://teststatic.chinaedu.com/sfs/mizarsaas/mizar_test/resource/m3u8/20200928/e2f294ea-9234-47e9-9a8b-65e98a26777a/e2f294ea-9234-47e9-9a8b-65e98a26777a.m3u8"
      },
      videoUrl: ""
    };
  },
  created() {
    console.log(this.$hello());
    this.videoUrl = this.videoData.mp4Url;
    // this.videoUrl =
    //   "https://jji-ice-test.jjmc.cn/volcano2/resource/pe/home/introduce.mp4";
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
  background: blue;
  height: 100vh;
  padding-top: constant(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
