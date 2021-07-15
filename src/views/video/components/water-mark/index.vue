<template>
  <div>
    <div
      ref="barrageTop"
      class="barrage-item barrage-item-top"
      :style="{ transform: 'translateX(9000px)' }"
    >
      璇子学校-大韵正在学习aaaa
    </div>
    <div ref="barrageBottom" class="barrage-item barrage-item-bottom">
      璇子学校-大韵正在学习
    </div>
  </div>
</template>

<script>
export default {
  name: "WaterMark",
  components: {},
  data() {
    return {
      showTop: true
    };
  },
  watch: {
    $route() {
      if (this.barrageTimerTop) {
        clearInterval(this.barrageTimerTop);
      }
      if (this.barrageTimerBottom) {
        clearInterval(this.barrageTimerBottom);
      }
      this.init();
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.renderResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.renderResize, false);
  },
  destroyed() {
    this.clearTimer();
  },
  methods: {
    init() {
      const barrageTop = this.$refs.barrageTop;
      const barrageBottom = this.$refs.barrageBottom;
      const pageWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      barrageTop.style = `transform: translateX(${pageWidth}px)`;
      barrageBottom.style = `transform: translateX(${pageWidth}px)`;
      this.topMove(pageWidth);
    },
    topMove(pageWidth) {
      const barrageTop = this.$refs.barrageTop;
      let barrageLeft = pageWidth;
      this.barrageTimerTop = setInterval(() => {
        barrageLeft--;
        if (barrageLeft - -barrageTop.offsetWidth === 80) {
          this.bottomMove(pageWidth);
        }
        if (barrageLeft <= -barrageTop.offsetWidth) {
          clearInterval(this.barrageTimerTop);
        }
        barrageTop.style = `transform: translateX(${barrageLeft}px)`;
      }, 16);
    },
    bottomMove(pageWidth) {
      const barrageBottom = this.$refs.barrageBottom;
      let barrageLeft = pageWidth;
      this.barrageTimerBottom = setInterval(() => {
        barrageLeft--;
        if (barrageLeft - -barrageBottom.offsetWidth === 50) {
          this.topMove(pageWidth);
        }
        if (barrageLeft <= -(barrageBottom.offsetWidth + 80)) {
          clearInterval(this.barrageTimerBottom);
        }
        barrageBottom.style = `transform: translateX(${barrageLeft}px)`;
      }, 16);
    },
    clearTimer() {
      if (this.barrageTimerTop) {
        clearInterval(this.barrageTimerTop);
      }
      if (this.barrageTimerBottom) {
        clearInterval(this.barrageTimerBottom);
      }
    },
    renderResize() {
      this.clearTimer();
      this.init();
    }
  }
};
</script>

<style scoped lang="scss">
.barrage-item {
  position: fixed;
  z-index: 9990;
  white-space: nowrap;
  padding: 6px 10px;
  font-size: 10px;
  border-radius: 13px;
  background: rgba(1, 1, 1, 0.3);
  transform: rotate(90deg);
  color: #fff;
  &.barrage-item-top {
    top: 70px;
  }
  &.barrage-item-bottom {
    top: 130px;
  }
}
</style>
