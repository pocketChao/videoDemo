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
        不同的进入和离开动画
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
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
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
      showFourth: false
    });
    return { show, showObject };
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
    height: 200px;
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
