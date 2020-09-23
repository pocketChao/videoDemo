<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
    >
      同时设置过渡和动画
    </lc-button>
    <transition type="transition" name="both">
      <p id="both" v-show="show">弘成教育</p>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { Button } from "vant";
export default defineComponent({
  name: "both",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    onMounted(() => {
      const el = document.getElementById("both");
      // 参数 事件名称（String）、要触发的事件处理函数(Function)、useCapture布尔值，规定是否是捕获型，默认为 false（冒泡）。因为是可选的，往往也会省略它。决定嵌套元素事件触发顺序(boolean)。
      el.addEventListener(
        "transitionend",
        () => {
          console.log("过渡结束");
        },
        false
      );
      el.addEventListener(
        "animationend",
        () => {
          console.log("动画结束");
        },
        false
      );
    });
    return { show };
  }
});
</script>

<style lang="scss" scoped>
/* 同时设置过渡和动画 */
.both-enter-active {
  animation: bounce-in 0.5s;
  transition: opacity 2s;
}
.both-leave-active {
  animation: bounce-in 0.6s reverse;
  transition: opacity 0.5s;
}
.both-enter,
.both-leave-to {
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
