<template>
  <div class="container">
    <water-mark></water-mark>
    <div id="player"></div>
    <img
      v-if="!isPlayingAudio"
      src="../../../assets/images/audio-btn.png"
      class="switch-audio"
      @click="switchMp3"
    />
    <img
      v-else
      src="../../../assets/images/video-play.png"
      class="switch-video"
      @click="switchVideo"
    />
  </div>
</template>

<script>
import {
  reactive,
  watch,
  computed,
  onMounted,
  ref
} from "@vue/composition-api";
// import { Toast } from "vant";
import Player from "xgplayer";
import WaterMark from "@/views/video/components/water-mark/index";
// import HlsJsPlayer from "xgplayer-hls.js";
// import FlvPlayer from "xgplayer-flv";
export default {
  components: { WaterMark },
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
  setup(props, { emit }) {
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
    const isXFive = computed(() => {
      // 判断是否为X5内核
      const ua = navigator.userAgent.toLocaleLowerCase();
      return (
        ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null
      );
    });
    const videoOptions = reactive({
      id: "player",
      url: props.videoUrl,
      // danmu: bulletScreen,
      autoplay: false,
      playsinline: !isXFive.value,
      // 静音
      // muted: true,
      width: 375,
      height: 211,
      // 设置跟随父容器（#player 的宽度调整  高度随上面设置的宽高的比例走）
      fluid: true,
      poster: "https://img.yzcdn.cn/vant/cat.jpeg",
      // 样式全屏功能不会隐藏当前浏览器的标签栏，导航栏，只是在当前页面内部全屏显示。
      cssFullscreen: true,
      rotate: false,
      // 禁止拖拽
      // disableProgress: true,
      allowSeekPlayed: true,
      // allowSeekAfterEnded: true,
      lastPlayTime: 20,
      lastPlayTimeHideDelay: 0,
      // 关闭双击全屏
      closeVideoDblclick: false,
      // progressDot: [{ time: 10 }, { time: 22 }],
      // 控制条配置 *只对原生video有效，对自定义UI请使用ignores选项
      // controlsList: [],
      ignores: ["replay"],
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      "x5-video-player-type": "h5-page",
      "x5-video-player-fullscreen": false,
      loop: true,
      lang: "zh-cn",
      danmu: {
        comments: [
          //弹幕数组
          {
            duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: "1", //弹幕id，需唯一
            start: 1000, //弹幕出现时间，毫秒
            prior: true, //该条弹幕优先显示，默认false
            color: true, //该条弹幕为彩色弹幕，默认false
            txt: "长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕", //弹幕文字内容
            style: {
              //弹幕自定义样式
              color: "#ff9500",
              fontSize: "20px",
              border: "solid 1px #ff9500",
              borderRadius: "50px",
              padding: "5px 11px",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            },
            mode: "top" //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
            // el: DOM //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
          }
        ],
        area: {
          //弹幕显示区域
          start: 0, //区域顶部到播放器顶部所占播放器高度的比例
          end: 1 //区域底部到播放器顶部所占播放器高度的比例
        },
        closeDefaultBtn: true, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
        defaultOff: true //开启此项后弹幕不会初始化，默认初始化弹幕
      }
    });
    const audioUrl = require("@/assets/videos/bird.mp3");
    const isPlayingAudio = ref(false);

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
          console.log("videoUrl传值改变");
          player.play();
          player.once("playing", () => {
            console.log("更换播放源开始播放第一次");
            player.currentTime = 10;
          });
        }
      }
    );
    const array = ref([{ name: "a" }, { name: "b" }, { name: "c" }]);
    onMounted(() => {
      console.log(navigator.userAgent);
      console.log(isXFive.value);
      console.log(videoType.value);
      player = new Player(videoOptions);
      // switch (videoType.value.toLowerCase()) {
      //   case "mp4":
      //     player = new Player(videoOptions);
      //     break;
      //   case "m3u8":
      //     player = new HlsJsPlayer(videoOptions);
      //     break;
      //   case "flv":
      //     player = new FlvPlayer(videoOptions);
      //     break;
      //   default:
      //     console.log("不支持该视频格式");
      //     break;
      // }
      player.emit("resourceReady", [
        {
          name: "标清",
          url: props.videoUrl
        },
        {
          name: "高清",
          url: props.videoUrl
        },
        {
          name: "超清",
          url: props.videoUrl
        }
      ]);
      player.on("ready", () => {
        console.log("ready");
        emit("ready");
      });
      player.once("playing", () => {
        console.log("开始播放第一次");
        // player.currentTime = 30;
      });
      player.on("play", () => {
        console.log("播放");
        emit("play");
      });
      player.on("canplay", () => {
        console.log("可以播放");
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
        this.$toast("全屏");
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
    function switchMp3() {
      isPlayingAudio.value = true;
      const currentTime = player.currentTime;
      console.log("==============");
      console.log(currentTime);
      console.log("==============");
      player.src = audioUrl;
      player.play();
      player.currentTime = currentTime;
      document.getElementsByClassName("xgplayer-start")[0].style.display =
        "none";
    }
    function switchVideo() {
      isPlayingAudio.value = false;
      const currentTime = player.currentTime;
      console.log("==============");
      console.log(currentTime);
      console.log("==============");
      player.src = props.videoUrl;
      player.play();
      player.currentTime = currentTime;
      document.getElementsByClassName("xgplayer-start")[0].style.display = "";
    }
    return {
      player,
      videoType,
      bulletScreen,
      videoOptions,
      onMounted,
      isPlayingAudio,
      switchMp3,
      switchVideo,
      array
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.switch-audio {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  z-index: 1;
}
.switch-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 100px;
  z-index: 1;
}
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
</style>
