<template>
  <div id="player"></div>
</template>

<script>
import { reactive, watch, computed, onMounted } from "@vue/composition-api";
import Player from "xgplayer";
import HlsJsPlayer from "xgplayer-hls.js";
import FlvPlayer from "xgplayer-flv";
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
    const videoType = computed(() => {
      const videoUrl = props.videoUrl;
      console.log(videoUrl);
      return videoUrl.substring(videoUrl.lastIndexOf(".") + 1);
    });
    const bulletScreen = reactive({
      comments: [
        //弹幕数组
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: "1", //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          prior: true, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: "这是一条弹幕", //弹幕文字内容
          style: {
            //弹幕自定义样式
            color: "#198CFF",
            fontSize: "20px",
            border: "solid 1px #ff9500",
            borderRadius: "50px",
            padding: "5px 11px",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          },
          mode: "scroll" //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
          // el: DOM //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
        }
      ],
      area: {
        //弹幕显示区域
        start: 0, //区域顶部到播放器顶部所占播放器高度的比例
        end: 1 //区域底部到播放器顶部所占播放器高度的比例
      },
      closeDefaultBtn: false, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
      defaultOff: false //开启此项后弹幕不会初始化，默认初始化弹幕
    });
    const videoOptions = reactive({
      id: "player",
      url: props.videoUrl,
      playsinline: true,
      // danmu: bulletScreen,
      autoplay: false,
      // 静音
      // muted: true,
      width: 375,
      height: 211,
      // 设置跟随父容器（#player 的宽度调整  高度随上面设置的宽高的比例走）
      fluid: true,
      poster: "https://img.yzcdn.cn/vant/cat.jpeg",
      // 样式全屏功能不会隐藏当前浏览器的标签栏，导航栏，只是在当前页面内部全屏显示。
      // cssFullscreen: true,
      rotate: false,
      // 禁止拖拽
      disableProgress: false,
      allowPlayAfterEnded: true,
      allowSeekAfterEnded: true,
      // 关闭双击全屏
      closeVideoDblclick: false,
      // progressDot: [{ time: 10 }, { time: 22 }],
      // 控制条配置 *只对原生video有效，对自定义UI请使用ignores选项
      // controlsList: [],
      ignores: ["replay"],
      // 微信 X5 同层播放（video上面可以放置html元素）
      "x5-video-player-type": "h5",
      // 微信 X5 全屏播放
      "x5-video-player-fullscreen": true
    });

    watch(
      () => {
        return [props.videoUrl, props.someProject];
      },
      (val, oldVal) => {
        if (!oldVal) {
          return;
        }
        if (val[0] !== oldVal[0]) {
          player.src = val[0];
          player.play();
          player.currentTime = 2;
        }
      }
    );
    onMounted(() => {
      console.log(videoType.value);
      switch (videoType.value.toLowerCase()) {
        case "mp4":
          player = new Player(videoOptions);
          break;
        case "m3u8":
          player = new HlsJsPlayer(videoOptions);
          break;
        case "flv":
          player = new FlvPlayer(videoOptions);
          break;
        default:
          console.log("不支持该视频格式");
          break;
      }
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
        // this.rotate(true, true, 1);
      });
      player.on("exitCssFullscreen", () => {
        console.log("退出css样式全屏");
      });
      player.on("error", function(err) {
        console.log("错误");
        console.log(err);
      });
      player.on("end", function() {
        console.log("结束");
      });
    });
    return { player, videoType, bulletScreen, videoOptions, onMounted };
  }
};
</script>

<style lang="scss" scoped>
#player {
  width: 100%;
  box-sizing: border-box !important;
  background: black;
}
/deep/ .xgplayer-progress-played {
  background: #198cff;
}
/deep/ .xgplayer-enter-spinner {
  width: 50px !important;
  height: 50px !important;
}
/deep/ .xgplayer-start {
  width: 90px !important;
  height: 90px !important;
  transform: translate(-50%, -50%) !important;
  margin: 0;
}
</style>
