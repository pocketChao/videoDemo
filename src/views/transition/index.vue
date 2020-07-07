<template>
  <div class="container">
    <div class="item">
      <lc-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="showObject.show = !showObject.show"
      >
        单元素切换
      </lc-button>
      <transition name="fade">
        <p v-if="showObject.show">弘成教育</p>
      </transition>
    </div>
    <div class="item">
      <lc-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="showObject.showSec = !showObject.showSec"
      >
        不同的进入和离开效果
      </lc-button>
      <transition name="slide-fade">
        <p v-if="showObject.showSec">弘成教育</p>
      </transition>
    </div>
    <div class="item">
      <lc-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="showObject.showThird = !showObject.showThird"
      >
        CSS动画
      </lc-button>
      <transition name="bounce">
        <p v-if="showObject.showThird">弘成教育</p>
      </transition>
    </div>
    <div class="item">
      <lc-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="showObject.showFourth = !showObject.showFourth"
      >
        自定义类名
      </lc-button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__bounceOutRight animate__slow"
      >
        <p v-if="showObject.showFourth">弘成教育</p>
      </transition>
    </div>
    <div class="item">
      <lc-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="showObject.showFifth = !showObject.showFifth"
      >
        JavaScript
      </lc-button>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        v-bind:css="false"
      >
        <p v-if="showObject.showFifth">
          弘成教育
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import Velocity from "velocity-animate";
import { Button } from "vant";

export default {
  components: {
    LcButton: Button
  },
  setup() {
    const show = ref(false);
    const showObject = reactive({
      show: false,
      showSec: false,
      showThird: false,
      showFourth: false,
      showFifth: false
    });
    function beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transformOrigin = "left";
    }
    function enter(el, done) {
      // 第一个参数：表示要执行动画的元素
      // 第二个参数：表示要执行动画的样式属性
      // 第三个参数：表示动画执行的时间长度
      // 第四个参数：表示动画执行完成的回调函数
      Velocity(el, { opacity: 1, fontSize: "1.4em" }, { duration: 300 });
      Velocity(el, { fontSize: "1em" }, { complete: done });
    }
    function leave(el, done) {
      Velocity(el, { translateX: "15px", rotateZ: "50deg" }, { duration: 600 });
      Velocity(el, { rotateZ: "100deg" }, { loop: 2 });
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
    return { show, showObject, beforeEnter, enter, leave };
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* 单元素切换 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  /* 不同的进入和离开动画 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  /* CSS动画 */
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
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
}
</style>
