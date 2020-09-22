<template>
  <div class="single">
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
    >
      单元素切换
    </lc-button>
    <transition name="fade">
      <img v-if="show" src="../../../assets/images/d.jpg" />
      <!--      <p v-if="show">弘成教育</p>-->
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { Button } from "vant";
export default defineComponent({
  name: "single",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    return { show };
  }
});
</script>

<style lang="scss" scoped>
/* 单元素切换 */
.fade-enter-active,
.fade-leave-active {
  /*
     transition 属性是一个简写属性，用于设置四个过渡属性：
     transition-property 规定设置过渡效果的 CSS 属性的名称。
     transition-duration 规定完成过渡效果需要多少秒或毫秒。
     transition-timing-function 规定速度效果的速度曲线。
     transition-delay 	定义过渡效果何时开始。
    */
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
