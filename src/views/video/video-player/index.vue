<template>
  <div id="player"></div>
</template>

<script>
import { reactive, watch, onMounted } from "@vue/composition-api";
import Player from "xgplayer";
import HlsJsPlayer from "xgplayer-hls.js";
export default {
  props: {
    videoUrl: {
      type: String,
      default: ""
    },
    someProject: {
      type: String,
      default: ""
    }
  },
  setup(props, { attrs, emit }) {
    console.log(props);
    console.log(attrs);
    let player = reactive({});
    const videoData = reactive({
      isLandscape: false,
      localMp4Url: require("@/assets/videos/vertical-test.mp4"),
      mp4Url:
        "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
      m3u8Url:
        "http://saas.g3.chinaedu.net:13691/sfs/mizarsaas/mizar_test/resource/m3u8/20200508/ca872a23-88c2-4e70-980a-5008944b1d22/ca872a23-88c2-4e70-980a-5008944b1d22.m3u8"
    });
    watch(
      () => {
        return [props.videoUrl, props.someProject];
      },
      (val, oldVal) => {
        console.log(val);
        console.log(oldVal);
        if (val[0] !== oldVal[0]) {
          player.start(val[0]);
        }
      }
    );
    onMounted(() => {
      player = new Player({
        id: "player",
        url: videoData.mp4Url,
        playsinline: true,
        autoplay: false,
        muted: true,
        // 设置跟随父容器（#player 的宽度调整）
        fluid: true,
        poster: "https://img.yzcdn.cn/vant/cat.jpeg",
        cssFullscreen: false,
        rotate: false,
        // 禁止拖拽
        disableProgress: false,
        // 控制条配置 *只对原生video有效，对自定义UI请使用ignores选项
        controlsList: [],
        // 微信 X5 同层播放（video上面可以放置html元素）
        "x5-video-player-type": "h5",
        // 微信 X5 全屏播放
        "x5-video-player-fullscreen": true
      });
      player.on("ready", () => {
        console.log("ready");
        emit("ready");
      });
      player.on("play", () => {
        console.log("播放");
        emit("play");
      });
      player.on("canplay", () => {
        console.log("可以播放");
      });
      player.on("playing", () => {
        console.log("继续播放");
      });
      player.on("canplaythrough", () => {
        console.log("可以流畅播放");
      });
      player.on("pause", () => {
        console.log("暂停");
      });
      player.on("seeking", () => {
        console.log("拖拽");
      });
      player.on("seeked", function() {
        console.log("拖拽结束");
        console.log(this);
      });
      player.on("timeupdate", function() {
        // console.log("时间更新");
        // console.log(player);
      });
      player.on("requestFullscreen", () => {
        console.log("全屏");
      });
      player.on("exitFullscreen", () => {
        console.log("退出全屏");
      });
      player.on("requestCssFullscreen", function() {
        console.log(this);
        console.log("进入css样式全屏");
        this.rotate(true, true, 1);
      });
      player.on("exitCssFullscreen", () => {
        console.log("退出css样式全屏");
      });
      player.on("error", function(err) {
        console.log("错误");
        console.log(err);
      });
    });
    return { player, videoData, onMounted };
  }
};
</script>

<style lang="scss" scoped>
#player {
  width: 100%;
  height: 100%;
  box-sizing: border-box !important;
  background: black;
}
</style>
