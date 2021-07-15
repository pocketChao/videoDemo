<template>
  <div class="music-container">
    <div id="music-player"></div>
    <div class="audio-playing">
      <div class="audio-playing-item middle"></div>
      <div class="audio-playing-item higher"></div>
      <div class="audio-playing-item short"></div>
      <div class="audio-playing-item highest"></div>
      <div class="audio-playing-item short"></div>
      <div class="audio-playing-item higher"></div>
      <div class="audio-playing-item middle"></div>
    </div>
    <img
      src="../../../assets/images/video-play.png"
      class="switch-video"
      @click="switchVideo"
    />
  </div>
</template>

<script>
import "xgplayer";
import Music from "xgplayer-music";
export default {
  props: {
    audioUrl: {
      type: String,
      default: ""
    }
  },
  name: "index",
  data() {
    return {
      aPlayer: undefined
    };
  },
  methods: {
    switchVideo() {
      console.log("switch");
    }
  },
  mounted() {
    this.aPlayer = new Music({
      id: "music-player",
      url: [
        {
          name: "",
          src: require("@/assets/videos/bird.mp3")
        }
      ],
      volume: 0.8,
      width: 375,
      height: 211,
      fluid: true,
      ignores: [
        "replay",
        "backward",
        "forward",
        "prev",
        "next",
        "cover",
        "name"
      ],
      lang: "zh-cn",
      playbackRate: [0.5, 0.75, 1, 1.5, 2]
    });
    this.aPlayer.on("canplay", () => {
      console.log("可以播放");
    });
    this.aPlayer.on("ready", () => {
      console.log("ready");
      this.$emit("ready");
    });
    this.aPlayer.once("play", () => {
      console.log("播放第一次");
      console.log(this.aPlayer.duration);
      this.aPlayer.currentTime = 30;
    });
    this.aPlayer.on("play", () => {
      console.log("播放");
      this.$emit("play");
    });
    this.aPlayer.on("canplay", () => {
      console.log("可以播放");
    });
    this.aPlayer.on("playing", () => {
      console.log("继续播放");
    });
    this.aPlayer.on("canplaythrough", () => {
      console.log("可以流畅播放");
    });
    this.aPlayer.on("pause", () => {
      console.log("暂停");
    });
    this.aPlayer.on("seeking", () => {
      console.log("拖拽");
    });
    this.aPlayer.on("seeked", function() {
      console.log("拖拽结束");
    });
    this.aPlayer.on("timeupdate", function() {
      // console.log("时间更新");
      // console.log(player);
    });
    this.aPlayer.on("error", function(err) {
      console.log("错误");
      console.log(err);
    });
    this.aPlayer.on("end", function() {
      console.log("结束");
    });
  }
};
</script>

<style lang="scss" scoped>
/deep/ .xgplayer-progress-played {
  background: #198cff;
}
/deep/ .xgplayer-icon-play {
  padding-top: 10px !important;
  padding-left: 20px !important;
}
/deep/ .xgplayer-icon-pause {
  padding-top: 10px !important;
  padding-left: 20px !important;
}

/*/deep/ .xgplayer-icon-play {
  display: flex !important;
  align-items: flex-start;
  margin-top: -10px !important;
  margin-left: 20px !important;
}
/deep/ .xgplayer-icon-pause {
  margin-top: -10px !important;
  margin-left: 20px !important;
}*/
/*/deep/ .xgplayer-progress {*/
/*  display: flex !important;*/
/*  align-items: center !important;*/
/*  position: relative;*/
/*  top: 0 !important;*/
/*}*/
/*/deep/ .xgplayer-time {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  top: 0 !important;*/
/*  position: relative;*/
/*}*/
/*/deep/ .xgplayer-controls{*/
/*  display: flex !important;*/
/*  align-items: center;*/
/*}*/
.music-container {
  position: relative;

  .audio-playing {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 102px;
    height: 94px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .audio-playing-item {
      width: 6px;
      background: #ffffff;
      border-radius: 4px;
      &.middle {
        height: 36px;
        animation: flashing 1s infinite 0.25s;
      }
      &.higher {
        height: 63px;
        animation: flashing 1s infinite 0.5s;
      }
      &.short {
        height: 28px;
        animation: flashing 1s infinite 0.75s;
      }
      &.highest {
        height: 94px;
        animation: flashing 1s infinite;
      }
      @keyframes flashing {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.35;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
  .switch-video {
    position: absolute;
    left: 50%;
    bottom: 51px;
    transform: translateX(-50%);
    width: 220px;
    height: 100px;
    z-index: 1;
  }
}
</style>
