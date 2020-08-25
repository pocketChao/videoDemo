<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
    >
      JavaScript
    </lc-button>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      v-bind:css="false"
    >
      <p v-if="show">
        弘成教育
      </p>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import Velocity from "velocity-animate";
import { Button } from "vant";
export default defineComponent({
  name: "js-transition",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    function beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transformOrigin = "left";
    }
    function enter(el, done) {
      // 第一个参数：表示要执行动画的元素
      // 第二个参数：表示要执行动画的样式属性
      // 第三个参数：表示动画执行的时间长度
      // 第四个参数：表示动画执行完成的回调函数
      Velocity(el, { opacity: 1, fontSize: "1.5em" }, { duration: 300 });
      Velocity(el, { fontSize: "1em" }, { complete: done });
    }
    function leave(el, done) {
      Velocity(el, { translateX: "15px", rotateZ: "50deg" }, { duration: 600 });
      Velocity(el, { rotateZ: "100deg" }, { loop: 3 });
      Velocity(
        el,
        {
          rotateZ: "45deg",
          translateY: "30px",
          translateX: "30px",
          opacity: 0
        },
        { complete: done }
      );
    }
    return { show, beforeEnter, enter, leave };
  }
});
</script>

<style scoped></style>
